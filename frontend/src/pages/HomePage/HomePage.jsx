import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import BookCard from '@/components/BookCard1';
import { CheckboxBasic } from './CheckboxBasic';
import { PaginationComponent } from './PaginationComponent';
import { books } from '@/data/books';
import { Truck, ShieldCheck, DollarSign, HelpCircle, Mail, RotateCcw } from 'lucide-react';
import HeroSection from './HeroSection';

const HomePage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    // Filters state
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;

    // Newsletter state
    const [emailInput, setEmailInput] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Categories list based on available books
    const availableCategories = [
        "Adventure",
        "Fantasy",
        "Science Fiction",
        "Biography",
        "Mystery",
        "Romance",
        "Historical Fiction"
    ];

    // Authors list based on available books
    const availableAuthors = [
        "J. K. Rowling",
        "Tara Westover",
        "Tony Faggioli",
        "Amisha Sathi"
    ];

    // Filter books based on search query, selected authors, and selected categories
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch = searchQuery
                ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;

            const matchesAuthor = selectedAuthors.length > 0
                ? selectedAuthors.includes(book.author)
                : true;

            const matchesCategory = selectedCategories.length > 0
                ? book.categories.some(cat => selectedCategories.includes(cat))
                : true;

            return matchesSearch && matchesAuthor && matchesCategory;
        });
    }, [searchQuery, selectedAuthors, selectedCategories]);

    // Reset pagination to first page when search query or filters change (tracked in render to avoid useEffect side effects)
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
    const [prevAuthors, setPrevAuthors] = useState(selectedAuthors);
    const [prevCategories, setPrevCategories] = useState(selectedCategories);

    if (
        searchQuery !== prevSearchQuery ||
        selectedAuthors !== prevAuthors ||
        selectedCategories !== prevCategories
    ) {
        setCurrentPage(1);
        setPrevSearchQuery(searchQuery);
        setPrevAuthors(selectedAuthors);
        setPrevCategories(selectedCategories);
    }

    // Paginated subset of filtered books
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const paginatedBooks = useMemo(() => {
        return filteredBooks.slice(
            (currentPage - 1) * booksPerPage,
            currentPage * booksPerPage
        );
    }, [filteredBooks, currentPage]);

    const handleAuthorChange = (author, checked) => {
        setSelectedAuthors(prev =>
            checked ? [...prev, author] : prev.filter(a => a !== author)
        );
    };

    const handleCategoryChange = (category, checked) => {
        setSelectedCategories(prev =>
            checked ? [...prev, category] : prev.filter(c => c !== category)
        );
    };

    const handleResetFilters = () => {
        setSelectedAuthors([]);
        setSelectedCategories([]);
        setSearchParams({});
    };

    return (
        <div className="pb-16">
            {/* Hero Section */}
            <HeroSection></HeroSection>

            {/* Main catalog workspace */}
            <div id="books-container" className='flex mx-4 md:mx-12 gap-8 my-6 items-start'>
                {/* Filter Sidebar */}
                <div className='w-64 shrink-0 hidden lg:block border border-border rounded-2xl p-6 bg-card text-card-foreground shadow-xs'>
                    <div className='flex items-center justify-between mb-6 pb-2 border-b border-border'>
                        <span className='text-lg font-bold text-foreground'>Filters</span>
                        {(selectedAuthors.length > 0 || selectedCategories.length > 0 || searchQuery) && (
                            <button
                                onClick={handleResetFilters}
                                className='text-xs font-semibold text-[#6C5DD4] hover:underline flex items-center gap-1 cursor-pointer'
                            >
                                Reset All
                            </button>
                        )}
                    </div>

                    <div className='flex flex-col gap-6'>
                        {/* Authors Checkbox List */}
                        <div>
                            <span className='font-bold text-sm text-foreground block mb-3'>Select Author</span>
                            <div className='flex flex-col gap-2'>
                                {availableAuthors.map(author => (
                                    <CheckboxBasic
                                        key={author}
                                        checked={selectedAuthors.includes(author)}
                                        onCheckedChange={(checked) => handleAuthorChange(author, checked)}
                                    >
                                        {author}
                                    </CheckboxBasic>
                                ))}
                            </div>
                        </div>

                        {/* Categories Checkbox List */}
                        <div>
                            <span className='font-bold text-sm text-foreground block mb-3'>Shop by Category</span>
                            <div className='flex flex-col gap-2'>
                                {availableCategories.map(cat => (
                                    <CheckboxBasic
                                        key={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onCheckedChange={(checked) => handleCategoryChange(cat, checked)}
                                    >
                                        {cat}
                                    </CheckboxBasic>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Books Listing Panel */}
                <div className='flex-1'>
                    {/* Search query tag */}
                    {searchQuery && (
                        <div className='mb-6 p-4 rounded-xl border border-border bg-muted/20 dark:bg-muted/5 flex items-center justify-between gap-4'>
                            <span className='text-sm font-medium text-muted-foreground'>
                                Showing search results for <span className='text-foreground font-bold'>"{searchQuery}"</span> ({filteredBooks.length} books found)
                            </span>
                            <button
                                onClick={() => setSearchParams({})}
                                className='text-xs font-semibold text-[#6C5DD4] hover:underline flex items-center gap-1 cursor-pointer'
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-foreground'>Books Catalog</h2>
                        <span className='text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full'>
                            {filteredBooks.length} Books
                        </span>
                    </div>

                    {/* Fallback empty state */}
                    {filteredBooks.length === 0 ? (
                        <div className='text-center py-20 border border-dashed border-border rounded-2xl bg-card flex flex-col items-center justify-center px-4'>
                            <div className='w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/45 flex items-center justify-center text-[#6C5DD4] mb-4 shadow-sm'>
                                <RotateCcw className='w-8 h-8' />
                            </div>
                            <h3 className='text-lg font-bold text-foreground mb-1'>No Books Found</h3>
                            <p className='text-sm text-muted-foreground max-w-sm mb-6'>
                                We couldn't find any books matching your selected filters or search terms. Try clearing your settings or using a different query.
                            </p>
                            <button
                                onClick={handleResetFilters}
                                className='px-5 py-2.5 bg-[#6C5DD4] text-white hover:bg-[#5b4eb8] rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer'
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
                                {paginatedBooks.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        id={book.id}
                                        title={book.title}
                                        coverImage={book.coverImage}
                                    />
                                ))}
                            </div>
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className='mx-4 md:mx-12 rounded-3xl bg-muted/30 dark:bg-muted/10 border border-border/80 p-8 md:p-12 mt-16 text-center relative overflow-hidden'>
                <div className='max-w-2xl mx-auto flex flex-col items-center relative z-10'>
                    <div className='w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950/40 text-[#6C5DD4] flex items-center justify-center mb-6 shadow-xs border border-purple-200/20'>
                        <Mail className='w-7 h-7' />
                    </div>
                    <h2 className='text-2xl md:text-3xl font-extrabold text-foreground mb-3'>
                        Join Our Literary Community
                    </h2>
                    <p className='text-sm text-muted-foreground mb-8 leading-relaxed max-w-lg'>
                        Subscribe to our newsletter to receive updates on new arrivals, exclusive author interviews, special discounts, and literary events.
                    </p>

                    {isSubscribed ? (
                        <div className='bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl py-3 px-6 text-sm font-semibold max-w-md w-full animate-in fade-in zoom-in duration-300'>
                            Thank you for subscribing! We've sent a welcome email to your inbox.
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (emailInput.trim()) {
                                    setIsSubscribed(true);
                                    setEmailInput('');
                                }
                            }}
                            className='flex flex-col sm:flex-row gap-3 w-full max-w-md'
                        >
                            <input
                                type='email'
                                required
                                placeholder='Enter your email address'
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className='flex-1 h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-[#6C5DD4] shadow-xs'
                            />
                            <button
                                type='submit'
                                className='h-11 px-6 bg-[#6C5DD4] text-white hover:bg-[#5b4eb8] rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow cursor-pointer'
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;