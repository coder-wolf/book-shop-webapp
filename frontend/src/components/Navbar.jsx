import React from 'react';

const Navbar = () => {
    return (
        <div className='mb-4 px-8 my-4 justify-between flex items-center'>
            <div>Logo</div>
            <div className='flex gap-4'>
                <span>Home</span>
                <span>Categories</span>
                <span>Collections</span>
            </div>
            <div className='bg-amber-300 text-black font-normal rounded-md px-4 py-1'>Sign Up</div>
        </div>
    );
};

export default Navbar;