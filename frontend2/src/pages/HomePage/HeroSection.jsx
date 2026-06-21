import React from 'react';
import { Search } from './Search';
import { Slider } from './Slider';

const HeroSection = () => {
    return (
        <div className=''>
            <div className='flex gap-12 flex-row justify-between'>
                <div className='flex-1 flex flex-col gap-6'>
                    <div className='border border-black w-min p-1 rounded-md text-sm'>/English/USD</div>
                    <div className='text-4xl font-semibold capitalize'>Start your reading <span className='text-amber-500'>adventure</span> invest in books today</div>
                    <div className=''>Welcome to our bookstore! Each book you purchase isn't just a story it's a passport to new worlds, exciting adventures, and endless possibilities. Dive into our curated collecition, filled with captivating tales waiting to be discovered.</div>
                    <div>
                        <Search></Search>
                    </div>
                </div>
                <div className='flex-1 '>
                    <div className='text-2xl font-medium mb-4'>Trending Now</div>
                    <div className='w-[90%]'><Slider></Slider></div>
                </div>
            </div>
            {/* <div>Buttons</div> */}
        </div>
    );
};

export default HeroSection;