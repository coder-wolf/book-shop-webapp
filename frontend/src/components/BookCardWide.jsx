import React from 'react';
import { Button } from './ui/button';

const BookCardWide = () => {
    return (
        <div className='flex gap-4 p-2 mt-2 bg-white rounded-md shadow-2xl '>
            <div className='w-24'>
                <img className='rounded' src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630663027l/18050143.jpg" alt="" />
            </div>
            <div className='w-36'>
                <p className='font-semibold'>Pride and Protest</p>
                <p className='text-[12px]'>A woman goes head to head with the CEO of...</p>
                <p className='py-2 font-semibold'>USD 15.05</p>
                <Button>Add to basket</Button>
            </div>
        </div>
    );
};

export default BookCardWide;