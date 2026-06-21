import React from 'react';

const SectionHeader = () => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='mb-1'>
                    <h2 className='text-2xl font-medium my-2'>New Releases</h2>
                    <p className='text-sm'>What's new? Browse latest titles in the new releases category to discover your next read!</p>
                </div>
                <div>
                    View All
                </div>
            </div>
        </div>
    );
};

export default SectionHeader;