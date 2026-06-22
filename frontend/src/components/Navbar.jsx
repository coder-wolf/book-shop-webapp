import { SearchJoined } from '@/pages/HomePage/SearchJoined';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import IconButton from './IconButton';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <div className='flex flex-row justify-between items-center mx-12 my-2'>
                <Link to="/">
                    <div className='flex flex-row items-center gap-2'>
                        <div className='rounded-md bg-red-400 w-12 h-12'>
                            <TbBooks className='h-12 w-12 text-white' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-2xl font-semibold'>Bookie</span>
                            <span className='text-sm'>Book Store Website</span>
                        </div>
                    </div>
                </Link>
                <div className='flex flex-row items-center'>
                    <div className='mr-1'><SearchJoined></SearchJoined></div>
                    <IconButton><MdOutlineFavoriteBorder /></IconButton>
                    <IconButton><HiOutlineShoppingCart /></IconButton>
                    <IconButton>
                        <img className='h-8 w-8 rounded-md object-cover' src="https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    </IconButton>
                </div>
            </div>
            <hr className='mb-2' />
        </div>
    );
};

export default Navbar;