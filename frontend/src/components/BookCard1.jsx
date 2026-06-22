import React from 'react';

const BookCard = ({
    coverImage,
    title,
}) => {
    return (
        <div className='items-center w-min h-min flex flex-col border rounded-md p-2 my-2'>
            <div className=' w-36 rounded-md '>
                <img src={coverImage} alt="" />
            </div>
            <div className='flex items-center text-center justify-center flex-col'>
                <div className='font-semibold'>{title}</div>
                <div className='text-[10px]'>ADVENTURE, SCIENCE</div>
                <div>* * * * * </div>
                <button className='hover:bg-[#6C5DD4] hover:text-white p-1 px-4 rounded-md border-2 mb-2'>Add to cart</button>
            </div>
        </div>
    );
};

export default BookCard;