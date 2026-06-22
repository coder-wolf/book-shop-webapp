import BookCardWide from '@/components/BookCardWide';
import SectionHeader from '@/components/SectionHeader';
import React from 'react';

const NewReleasesSection = () => {
    return (
        <div className='gap-2'>
            <SectionHeader></SectionHeader>
            <div className='flex flex-row w-full gap-4'>
                <BookCardWide></BookCardWide>
                <BookCardWide></BookCardWide>
                <BookCardWide></BookCardWide>
                <BookCardWide></BookCardWide>
            </div>
        </div>
    );
};

export default NewReleasesSection;