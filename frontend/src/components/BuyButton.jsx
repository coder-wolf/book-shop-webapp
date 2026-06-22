import React from 'react';

const BuyButton = () => {
    const handleButtonClick = (e) => {
        e.stopPropagation(); // 🚀 THIS IS THE MAGIC LINE
        e.preventDefault(); // 🚀 THIS IS THE MAGIC LINE
        // alert("Button clicked without navigating!");
    };

    return (
        <button
            onClick={handleButtonClick}
            className='w-full mt-4 py-2 px-4 rounded-lg border border-[#6C5DD4] bg-[#6C5DD4] text-white text-md font-semibold transition-all duration-200 cursor-pointer'>
            Add to cart
        </button>
    );
};

export default BuyButton;