import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { books } from '@/data/books';
import { Link } from 'react-router';
import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';

const CartPage = () => {
    const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useShop();

    // Coupon states
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    // Map cart items of IDs to book objects and include quantities
    const cartItems = cart.map(item => {
        const book = books.find(b => b.id === item.bookId);
        return {
            ...item,
            book
        };
    }).filter(item => item.book !== undefined);

    const subtotal = getCartTotal();
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
    const tax = Number((subtotal * 0.05).toFixed(2));
    const discountAmount = Number((subtotal * discount).toFixed(2));
    const total = Number((subtotal + shipping + tax - discountAmount).toFixed(2));

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const code = couponCode.trim().toUpperCase();
        if (code === 'SAVE10') {
            setDiscount(0.10);
            setCouponSuccess('Coupon "SAVE10" applied! 10% discount added.');
            setCouponError('');
        } else if (code === 'WELCOME5') {
            setDiscount(0.05);
            setCouponSuccess('Coupon "WELCOME5" applied! 5% discount added.');
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code. Try "SAVE10"!');
            setCouponSuccess('');
        }
    };

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutComplete(true);
            // Clear cart implicitly could be done, but for mock let's just show screen
        }, 1500);
    };

    if (checkoutComplete) {
        return (
            <div className='mx-4 md:mx-12 py-16 text-center max-w-xl mx-auto flex flex-col items-center justify-center min-h-[60vh]'>
                <div className='w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-emerald-500/20'>
                    <ShieldCheck className='w-9 h-9' />
                </div>
                <h2 className='text-3xl font-extrabold text-foreground mb-3'>Order Confirmed!</h2>
                <p className='text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm'>
                    Thank you for your purchase. We are preparing your order and will email you with shipping confirmation details shortly.
                </p>
                <Link 
                    to="/" 
                    onClick={() => {
                        // Reset cart when checkout finishes
                        cart.forEach(item => removeFromCart(item.bookId));
                    }}
                    className='px-6 py-3 bg-[#6C5DD4] hover:bg-[#5b4eb8] text-white rounded-xl font-semibold text-sm transition-all shadow-sm cursor-pointer'
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className='mx-4 md:mx-12 py-8 text-foreground min-h-[60vh]'>
            {/* Header / Breadcrumb */}
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
                <Link to="/" className='hover:text-primary transition-colors flex items-center gap-1'>
                    <ArrowLeft className='w-4 h-4' /> Back to Catalog
                </Link>
            </div>

            <h1 className='text-3xl font-bold tracking-tight mb-8 pb-4 border-b border-border'>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className='text-center py-20 border border-dashed border-border rounded-2xl bg-card flex flex-col items-center justify-center px-4 max-w-2xl mx-auto shadow-xs'>
                    <div className='w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-[#6C5DD4] mb-4 shadow-sm border border-purple-100/10'>
                        <ShoppingCart className='w-8 h-8' />
                    </div>
                    <h3 className='text-lg font-bold text-foreground mb-1'>Your Cart is Empty</h3>
                    <p className='text-sm text-muted-foreground max-w-sm mb-6'>
                        Before you check out, you must add some books to your shopping cart.
                    </p>
                    <Link 
                        to="/" 
                        className='px-5 py-2.5 bg-[#6C5DD4] hover:bg-[#5b4eb8] text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer'
                    >
                        Explore Catalog
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                    {/* Cart Items List */}
                    <div className='lg:col-span-8 space-y-4'>
                        {cartItems.map((item) => (
                            <div 
                                key={item.bookId}
                                className='flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-border/80 bg-card shadow-xs gap-4 transition-all duration-200 hover:border-border'
                            >
                                <div className='flex items-center gap-4 w-full sm:w-auto'>
                                    {/* Cover image */}
                                    <Link to={`/book/${item.bookId}`} className='w-20 aspect-[3/4] rounded-lg overflow-hidden border border-border shrink-0 bg-muted'>
                                        <img className='w-full h-full object-cover' src={item.book.coverImage} alt={item.book.title} />
                                    </Link>
                                    
                                    {/* Info */}
                                    <div>
                                        <Link to={`/book/${item.bookId}`} className='font-bold text-sm text-foreground hover:text-[#6C5DD4] transition-colors block line-clamp-1'>
                                            {item.book.title}
                                        </Link>
                                        <span className='text-xs text-muted-foreground block mb-1'>by {item.book.author}</span>
                                        <span className='text-xs font-bold text-[#6C5DD4]'>${item.book.price}</span>
                                    </div>
                                </div>

                                {/* Controls & Subtotal */}
                                <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0'>
                                    {/* Quantity controls */}
                                    <div className='flex items-center border border-border bg-background rounded-lg h-9'>
                                        <button 
                                            onClick={() => updateCartQuantity(item.bookId, item.quantity - 1)}
                                            className='px-2.5 hover:bg-muted text-muted-foreground transition-colors duration-150 h-full rounded-l-lg cursor-pointer'
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className='w-3.5 h-3.5' />
                                        </button>
                                        <span className='w-8 text-center font-bold text-xs'>{item.quantity}</span>
                                        <button 
                                            onClick={() => updateCartQuantity(item.bookId, item.quantity + 1)}
                                            className='px-2.5 hover:bg-muted text-muted-foreground transition-colors duration-150 h-full rounded-r-lg cursor-pointer'
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className='w-3.5 h-3.5' />
                                        </button>
                                    </div>

                                    {/* Total price & remove */}
                                    <div className='flex items-center gap-4'>
                                        <span className='font-bold text-sm text-right w-16'>
                                            ${(item.book.price * item.quantity)}
                                        </span>
                                        <button 
                                            onClick={() => removeFromCart(item.bookId)}
                                            className='p-2 hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground rounded-lg transition-all duration-150 cursor-pointer border border-transparent hover:border-rose-500/20'
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Panel */}
                    <div className='lg:col-span-4 bg-muted/20 dark:bg-muted/5 border border-border rounded-2xl p-6'>
                        <h2 className='text-lg font-bold text-foreground mb-4 pb-3 border-b border-border'>Order Summary</h2>
                        
                        {/* Summary specifications */}
                        <div className='space-y-3 text-sm mb-6'>
                            <div className='flex justify-between py-1 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium'>Subtotal</span>
                                <span className='font-semibold text-foreground'>${subtotal}</span>
                            </div>
                            {discount > 0 && (
                                <div className='flex justify-between py-1 border-b border-border/40 text-emerald-600 font-semibold'>
                                    <span>Discount ({(discount * 100)}%)</span>
                                    <span>-${discountAmount}</span>
                                </div>
                            )}
                            <div className='flex justify-between py-1 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium'>Shipping</span>
                                <span className='font-semibold text-foreground'>
                                    {shipping === 0 ? 'Free' : `$${shipping}`}
                                </span>
                            </div>
                            <div className='flex justify-between py-1 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium'>Estimated Tax (5%)</span>
                                <span className='font-semibold text-foreground'>${tax}</span>
                            </div>
                            <div className='flex justify-between py-2 text-base font-extrabold text-foreground'>
                                <span>Order Total</span>
                                <span className='text-[#6C5DD4]'>${total}</span>
                            </div>
                        </div>

                        {/* Coupon Form */}
                        <form onSubmit={handleApplyCoupon} className='mb-6'>
                            <label htmlFor='coupon' className='text-xs font-bold text-muted-foreground block mb-2 uppercase tracking-wider'>
                                Have a Promo Code?
                            </label>
                            <div className='flex gap-2'>
                                <div className='relative flex-1'>
                                    <Tag className='absolute left-3 top-3 w-4 h-4 text-muted-foreground/60' />
                                    <input 
                                        type='text' 
                                        id='coupon'
                                        placeholder='Try SAVE10' 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className='w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-xs focus:outline-none focus:border-[#6C5DD4]'
                                    />
                                </div>
                                <button 
                                    type='submit' 
                                    className='px-4 h-10 border border-border bg-card hover:bg-muted font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0'
                                >
                                    Apply
                                </button>
                            </div>
                            {couponError && <span className='text-rose-500 text-xs font-medium mt-1.5 block'>{couponError}</span>}
                            {couponSuccess && <span className='text-emerald-600 text-xs font-medium mt-1.5 block'>{couponSuccess}</span>}
                        </form>

                        {/* Checkout button */}
                        <button 
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className='w-full h-11 flex items-center justify-center gap-2 bg-[#6C5DD4] text-white hover:bg-[#5b4eb8] rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isCheckingOut ? 'Processing Checkout...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
