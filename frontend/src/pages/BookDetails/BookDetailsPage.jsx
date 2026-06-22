import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard1';
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft, BookOpen, Calendar, FileText, Bookmark, Star, Globe } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { toggleFavorite, isBookFavorite, addToCart } = useShop();
    
    // Find the current book
    const book = books.find(b => b.id === id);
    const isFavorite = isBookFavorite(book?.id);

    // Scroll to top when book changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!book) {
        return (
            <div className='mx-4 md:mx-12 py-16 flex flex-col items-center justify-center text-center'>
                <h2 className='text-2xl font-bold text-foreground mb-4'>Book Not Found</h2>
                <p className='text-muted-foreground mb-6'>The book you are looking for does not exist or has been removed.</p>
                <Link to="/" className='px-6 py-3 rounded-lg bg-[#6C5DD4] text-white font-medium hover:bg-[#5b4eb8] transition-colors duration-200'>
                    Back to Catalog
                </Link>
            </div>
        );
    }

    // Filter related books (sharing a category, excluding the current book)
    const relatedBooks = books
        .filter(b => b.id !== book.id && b.categories.some(cat => book.categories.includes(cat)))
        .slice(0, 4);

    // Fallback in case no related books share categories
    const displayedRelatedBooks = relatedBooks.length > 0 
        ? relatedBooks 
        : books.filter(b => b.id !== book.id).slice(0, 4);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // Calculate rating stars
    const renderStars = (rating) => {
        const stars = [];
        const floor = Math.floor(rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= floor) {
                stars.push(<Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />);
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-muted-foreground/30" />);
            }
        }
        return stars;
    };

    return (
        <div className='mx-4 md:mx-12 py-8 text-foreground'>
            {/* Breadcrumbs */}
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-8'>
                <Link to="/" className='hover:text-primary transition-colors flex items-center gap-1'>
                    <ArrowLeft className='w-4 h-4' /> Back to Catalog
                </Link>
                <span>/</span>
                <span className='text-muted-foreground/60'>Books</span>
                <span>/</span>
                <span className='text-foreground font-medium truncate max-w-[200px]'>{book.title}</span>
            </div>

            {/* Product Hero */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12'>
                {/* Book Cover Image */}
                <div className='lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start items-start'>
                    <div className='w-full max-w-[320px] lg:max-w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-border bg-muted group relative'>
                        <img 
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                            src={book.coverImage} 
                            alt={book.title} 
                        />
                        <div className='absolute top-3 right-3 bg-white/95 dark:bg-black/80 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-[#6C5DD4] uppercase tracking-wider shadow-sm'>
                            {book.format}
                        </div>
                    </div>
                </div>

                {/* Book Summary & Purchase Actions */}
                <div className='lg:col-span-7 xl:col-span-8 flex flex-col justify-between py-1'>
                    <div>
                        <div className='flex flex-wrap gap-2 mb-3'>
                            {book.categories.map((cat, idx) => (
                                <span key={idx} className='text-[10px] font-bold tracking-wider text-[#6C5DD4] bg-[#6C5DD4]/10 rounded-full px-3 py-1 uppercase'>
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2'>
                            {book.title}
                        </h1>
                        <p className='text-lg text-muted-foreground font-medium mb-4'>
                            by <span className='text-foreground hover:underline cursor-pointer'>{book.author}</span>
                        </p>

                        <div className='flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border'>
                            <div className='flex items-center gap-1.5'>
                                <div className='flex items-center'>
                                    {renderStars(book.rating)}
                                </div>
                                <span className='font-bold text-sm ml-1'>{book.rating.toFixed(1)}</span>
                            </div>
                            <span className='text-muted-foreground text-sm'>•</span>
                            <span className='text-muted-foreground text-sm hover:underline cursor-pointer'>{book.reviewsCount} Reviews</span>
                            <span className='text-muted-foreground text-sm'>•</span>
                            <span className='text-emerald-600 font-semibold text-sm bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded'>In Stock</span>
                        </div>

                        <div className='mb-6'>
                            <span className='text-4xl font-extrabold text-[#6C5DD4]'>
                                ${book.price}
                            </span>
                            <span className='text-sm text-muted-foreground ml-3 line-through'>
                                ${(book.price * 1.25).toFixed(0)}
                            </span>
                            <span className='text-xs font-semibold text-emerald-600 ml-2 bg-emerald-500/10 px-2 py-0.5 rounded-full'>
                                Save 20%
                            </span>
                        </div>

                        <p className='text-muted-foreground leading-relaxed text-sm mb-8 line-clamp-3 lg:line-clamp-4'>
                            {book.description}
                        </p>
                    </div>

                    {/* Actions and Quantity */}
                    <div className='flex flex-wrap gap-4 items-center bg-muted/35 dark:bg-muted/10 p-4 rounded-xl border border-border/60 max-w-xl'>
                        <div className='flex items-center border border-border bg-background rounded-lg h-11'>
                            <button 
                                onClick={handleDecrement}
                                className='px-3 hover:bg-muted text-muted-foreground transition-colors duration-150 h-full rounded-l-lg cursor-pointer'
                                aria-label="Decrease quantity"
                            >
                                <Minus className='w-4 h-4' />
                            </button>
                            <span className='w-12 text-center font-semibold text-sm'>{quantity}</span>
                            <button 
                                onClick={handleIncrement}
                                className='px-3 hover:bg-muted text-muted-foreground transition-colors duration-150 h-full rounded-r-lg cursor-pointer'
                                aria-label="Increase quantity"
                            >
                                <Plus className='w-4 h-4' />
                            </button>
                        </div>

                        <button 
                            onClick={() => addToCart(book.id, quantity)}
                            className='flex-1 h-11 flex items-center justify-center gap-2 bg-[#6C5DD4] text-white hover:bg-[#5b4eb8] rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow cursor-pointer'
                        >
                            <ShoppingCart className='w-4 h-4' /> Add to Cart
                        </button>

                        <button 
                            onClick={() => toggleFavorite(book.id)}
                            className={`w-11 h-11 flex items-center justify-center border rounded-lg transition-all duration-200 cursor-pointer ${
                                isFavorite 
                                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/50' 
                                    : 'border-border hover:bg-muted text-muted-foreground'
                            }`}
                            aria-label="Add to favorites"
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Book Info Tabs */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-border pt-10 mb-16'>
                {/* Left: Tab Content (Description & Reviews) */}
                <div className='lg:col-span-8'>
                    <div className='flex border-b border-border mb-6 gap-6'>
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`pb-3 font-semibold text-sm transition-all duration-200 border-b-2 cursor-pointer ${
                                activeTab === 'description' 
                                    ? 'border-[#6C5DD4] text-foreground' 
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-3 font-semibold text-sm transition-all duration-200 border-b-2 cursor-pointer ${
                                activeTab === 'reviews' 
                                    ? 'border-[#6C5DD4] text-foreground' 
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Reviews ({book.reviewsCount})
                        </button>
                    </div>

                    {activeTab === 'description' ? (
                        <div className='prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4'>
                            <p>{book.description}</p>
                            <p>This volume is complete with modern annotations, bibliography details, and custom reader notes. Experience this literary masterpiece with the highest quality paper and durable bindings designed to last a lifetime.</p>
                        </div>
                    ) : (
                        <div className='space-y-6'>
                            <div className='flex flex-wrap items-center gap-6 p-6 bg-muted/30 dark:bg-muted/10 rounded-xl border border-border/60'>
                                <div className='text-center'>
                                    <div className='text-4xl font-extrabold mb-1'>{book.rating.toFixed(1)}</div>
                                    <div className='flex justify-center mb-1'>{renderStars(book.rating)}</div>
                                    <div className='text-xs text-muted-foreground font-medium'>Overall Rating</div>
                                </div>
                                <div className='flex-1 min-w-[200px] space-y-2'>
                                    <div className='flex items-center gap-3 text-xs'>
                                        <span className='w-8 text-muted-foreground font-medium'>5 Star</span>
                                        <div className='flex-1 bg-muted dark:bg-muted-foreground/10 h-2 rounded-full overflow-hidden'>
                                            <div className='bg-amber-500 h-full w-[85%]' />
                                        </div>
                                        <span className='w-8 text-muted-foreground text-right font-medium'>85%</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-xs'>
                                        <span className='w-8 text-muted-foreground font-medium'>4 Star</span>
                                        <div className='flex-1 bg-muted dark:bg-muted-foreground/10 h-2 rounded-full overflow-hidden'>
                                            <div className='bg-amber-500 h-full w-[10%]' />
                                        </div>
                                        <span className='w-8 text-muted-foreground text-right font-medium'>10%</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-xs'>
                                        <span className='w-8 text-muted-foreground font-medium'>3 Star</span>
                                        <div className='flex-1 bg-muted dark:bg-muted-foreground/10 h-2 rounded-full overflow-hidden'>
                                            <div className='bg-amber-500 h-full w-[4%]' />
                                        </div>
                                        <span className='w-8 text-muted-foreground text-right font-medium'>4%</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-xs'>
                                        <span className='w-8 text-muted-foreground font-medium'>2 Star</span>
                                        <div className='flex-1 bg-muted dark:bg-muted-foreground/10 h-2 rounded-full overflow-hidden'>
                                            <div className='bg-amber-500 h-full w-[1%]' />
                                        </div>
                                        <span className='w-8 text-muted-foreground text-right font-medium'>1%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='space-y-4 pt-2'>
                                <div className='border-b border-border/60 pb-4'>
                                    <div className='flex justify-between items-start mb-1.5'>
                                        <div>
                                            <span className='font-semibold text-sm block'>Sarah Jenkins</span>
                                            <span className='text-xs text-muted-foreground'>Verified Purchaser • 2 days ago</span>
                                        </div>
                                        <div className='flex'>{renderStars(5)}</div>
                                    </div>
                                    <p className='text-sm text-muted-foreground'>Could not put it down! Absolutely fantastic read from start to finish. Highly recommend it to anyone who loves deep, character-driven storytelling.</p>
                                </div>
                                <div className='border-b border-border/60 pb-4'>
                                    <div className='flex justify-between items-start mb-1.5'>
                                        <div>
                                            <span className='font-semibold text-sm block'>David Miller</span>
                                            <span className='text-xs text-muted-foreground'>Verified Purchaser • 1 week ago</span>
                                        </div>
                                        <div className='flex'>{renderStars(4.5)}</div>
                                    </div>
                                    <p className='text-sm text-muted-foreground'>Great addition to the library. The physical print quality is premium, binding is strong, and the translation/edition is clean. Story itself is 5 stars.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Technical Specs */}
                <div className='lg:col-span-4'>
                    <div className='bg-muted/20 dark:bg-muted/5 rounded-2xl p-6 border border-border/80'>
                        <h2 className='text-lg font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2'>
                            <FileText className='w-4.5 h-4.5 text-[#6C5DD4]' /> Book Specifications
                        </h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium flex items-center gap-1.5'>
                                    <Bookmark className='w-3.5 h-3.5' /> Format
                                </span>
                                <span className='font-semibold text-foreground'>{book.format}</span>
                            </div>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium flex items-center gap-1.5'>
                                    <BookOpen className='w-3.5 h-3.5' /> Pages
                                </span>
                                <span className='font-semibold text-foreground'>{book.pages} pages</span>
                            </div>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5' /> Year of Issue
                                </span>
                                <span className='font-semibold text-foreground'>{book.year}</span>
                            </div>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium flex items-center gap-1.5'>
                                    <Globe className='w-3.5 h-3.5' /> Language
                                </span>
                                <span className='font-semibold text-foreground'>{book.language}</span>
                            </div>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium'>ISBN</span>
                                <span className='font-semibold text-foreground'>{book.isbn}</span>
                            </div>
                            <div className='flex justify-between py-1.5 border-b border-border/40'>
                                <span className='text-muted-foreground font-medium'>Publisher</span>
                                <span className='font-semibold text-foreground'>{book.publisher}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className='border-t border-border pt-12'>
                <div className='flex justify-between items-baseline mb-8'>
                    <h2 className='text-2xl font-bold text-foreground'>Related Books</h2>
                    <Link to="/" className='text-sm font-semibold text-[#6C5DD4] hover:underline'>
                        View all books
                    </Link>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6'>
                    {displayedRelatedBooks.map((relatedBook) => (
                        <BookCard 
                            key={relatedBook.id}
                            id={relatedBook.id}
                            title={relatedBook.title}
                            coverImage={relatedBook.coverImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;