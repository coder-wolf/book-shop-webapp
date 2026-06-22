import BookCard from '@/components/BookCard1';
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react';
import { CheckboxBasic } from './CheckboxBasic';

const HomePage = () => {
    return (
        <div className='flex w-full h-screen mx-4 gap-4'>
            <div className='md:flex-1 hidden lg:block'>
                <div className='text-xl font-semibold mb-4'>Filter Options</div>
                <div className='flex flex-col gap-2'>
                    <div className='border rounded py-2 px-2'>
                        <span>Choose Publisher</span>
                    </div>
                    <div className='border rounded py-2 px-2'>
                        <span>Select Year</span>
                        <CheckboxBasic>2026</CheckboxBasic>
                        <CheckboxBasic>2025</CheckboxBasic>
                        <CheckboxBasic>2024</CheckboxBasic>
                        <CheckboxBasic>2023</CheckboxBasic>
                        <CheckboxBasic>..</CheckboxBasic>
                    </div>
                    <div className='border rounded py-2 px-2'>
                        <span>Shop by Category</span>
                        <div className=''>
                            <div className=''>
                                <CheckboxBasic>Action</CheckboxBasic>
                                <CheckboxBasic>Adventure</CheckboxBasic>
                                <CheckboxBasic>Aninmation</CheckboxBasic>
                                <CheckboxBasic>Biography</CheckboxBasic>
                                <CheckboxBasic>Comedy</CheckboxBasic>
                                <CheckboxBasic>Crime</CheckboxBasic>
                                <CheckboxBasic>Documentary</CheckboxBasic>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-7 pl-2'>
                <div className='text-xl font-semibold mb-4'>Books</div>
                <div className='grid sm:grid-cols-3 md:grid-cols-6 grid-cols-2 '>
                    <BookCard title="Harry Potter" coverImage="https://dryuc24b85zbr.cloudfront.net/tes/resources/6441170/image?width=500&height=500&version=1474643904786" />
                    <BookCard title="Echoes of tomorrow" coverImage="https://images.template.net/453953/6x9-Book-Cover-Template-edit-online.png" />
                    <BookCard title="A million to one" coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsfxrcUtlaLqSTTpA7N9cWKIopvRNtXngM2A&s" />
                    <BookCard title="Educated" coverImage="https://www.writersdigest.com/uploads/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg?format=auto&optimize=high&width=1440" />
                    <BookCard title="Beyond the ocean door" coverImage="https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg" />
                    <BookCard title="Memory" coverImage="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1734004864" />
                    <BookCard title="The night ocean" coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNZl1zD4r4CMPYKpJApEmfT_J1H9NlFz0New&s" />
                    <BookCard title="Really good, actually" coverImage="https://images.squarespace-cdn.com/content/v1/624da83e75ca872f189ffa42/aa45e942-f55d-432d-8217-17c7d98105ce/image001.jpg" />
                    <BookCard title="Flashlight" coverImage="https://s26162.pcdn.co/wp-content/uploads/2025/05/flashlight.png" />
                    <BookCard title="Sin eater" coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS44Ikz5jD3_306-TNqoAK5Go9o1grVT9NVVA&s" />
                    <BookCard title="Harry Potter and the cursed child" coverImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KuFBHfsxQZK3XSsXtiRqaXOWcRn2MId1Tw&s" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;