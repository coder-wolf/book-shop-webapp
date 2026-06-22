import { SearchJoined } from '@/pages/HomePage/SearchJoined';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import IconButton from './IconButton';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";
import { Link } from 'react-router';
import { useShop } from '@/context/ShopContext';

const Navbar = () => {
    const { getCartCount, favorites } = useShop();
    const cartCount = getCartCount();
    const favoritesCount = favorites.length;

    return (
        <div>
            <div className='flex flex-row justify-between items-center mx-12 my-2'>
                <Link to="/" className='flex flex-row items-center gap-2 cursor-pointer'>
                    <div className='rounded-md bg-purple-400 w-12 h-12 flex items-center justify-center'>
                        <TbBooks className='h-8 w-8 text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold text-foreground leading-tight'>Bookoe</span>
                        <span className='text-xs text-muted-foreground'>Book Store Website</span>
                    </div>
                </Link>
                <div className='flex flex-row items-center gap-1'>
                    <div className='mr-2'><SearchJoined></SearchJoined></div>
                    
                    <Link to="/favorites" className='relative'>
                        <IconButton aria-label="Favorites page">
                            <MdOutlineFavoriteBorder className="text-xl" />
                        </IconButton>
                        {favoritesCount > 0 && (
                            <span className='absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[10px] font-bold w-5 h-5 flex items-center justify-center border-2 border-background animate-in zoom-in duration-200'>
                                {favoritesCount}
                            </span>
                        )}
                    </Link>
                    
                    <Link to="/cart" className='relative'>
                        <IconButton aria-label="Cart page">
                            <HiOutlineShoppingCart className="text-xl" />
                        </IconButton>
                        {cartCount > 0 && (
                            <span className='absolute -top-1 -right-1 bg-[#6C5DD4] text-white rounded-full text-[10px] font-bold w-5 h-5 flex items-center justify-center border-2 border-background animate-in zoom-in duration-200'>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    
                    <IconButton>
                        <img className='h-8 w-8 rounded-md object-cover' src="https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    </IconButton>
                </div>
            </div>
            <hr className='mb-2 border-border/80' />
        </div>
    );
};

export default Navbar;