import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import BookCard from '@/components/BookCard1';
import { CheckboxBasic } from './CheckboxBasic';
import { PaginationComponent } from './PaginationComponent';
import { books } from '@/data/books';
import { Truck, ShieldCheck, DollarSign, HelpCircle, Mail, RotateCcw } from 'lucide-react';

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
            <div className='mx-4 md:mx-12 rounded-3xl bg-gradient-to-r from-[#6C5DD4] to-[#8C7DF4] p-8 md:p-12 text-white shadow-xl mb-12 flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden relative'>
                {/* Visual decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />
                
                <div className='flex flex-col max-w-xl relative z-10'>
                    <span className='text-xs font-bold uppercase tracking-widest text-[#E3DFFF] mb-3 bg-white/10 px-3 py-1 rounded-full w-max'>Book Store Website</span>
                    <h1 className='text-4xl md:text-5xl font-extrabold leading-tight mb-4'>
                        Discover Your Next Great Adventure
                    </h1>
                    <p className='text-base text-[#E3DFFF]/90 mb-8 leading-relaxed'>
                        Explore thousands of books ranging from fantasy epics to inspiring biographies. Find the stories that shape your worldview.
                    </p>
                    <div className='flex flex-wrap gap-4'>
                        <button 
                            onClick={() => document.getElementById('books-container')?.scrollIntoView({ behavior: 'smooth' })}
                            className='bg-white text-[#6C5DD4] hover:bg-neutral-50 px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all hover:scale-105 duration-200 cursor-pointer'
                        >
                            Explore Catalog
                        </button>
                        <button 
                            onClick={() => navigate('/book/educated')}
                            className='border border-white/40 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 duration-200 cursor-pointer'
                        >
                            Best Sellers
                        </button>
                    </div>
                </div>
                
                {/* Floating book cover layout */}
                <div className='relative w-full max-w-[280px] aspect-[4/3] flex items-center justify-center z-10'>
                    <div className='absolute transform -rotate-12 translate-x-[-40px] z-0 scale-90 w-36 aspect-[3/4] rounded-lg shadow-lg border border-white/20 overflow-hidden bg-muted transition-transform duration-300 hover:scale-95'>
                        <img className="w-full h-full object-cover" src="https://dryuc24b85zbr.cloudfront.net/tes/resources/6441170/image?width=500&height=500&version=1474643904786" alt="Harry Potter cover" />
                    </div>
                    <div className='absolute z-10 w-40 aspect-[3/4] rounded-lg shadow-2xl border border-white/30 overflow-hidden bg-muted transition-transform duration-300 hover:scale-105'>
                        <img className="w-full h-full object-cover" src="https://www.writersdigest.com/uploads/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg?format=auto&optimize=high&width=1440" alt="Educated cover" />
                    </div>
                    <div className='absolute transform rotate-12 translate-x-[40px] z-0 scale-90 w-36 aspect-[3/4] rounded-lg shadow-lg border border-white/20 overflow-hidden bg-muted transition-transform duration-300 hover:scale-95'>
                        <img className="w-full h-full object-cover" src="https://images.template.net/453953/6x9-Book-Cover-Template-edit-online.png" alt="Echoes of Tomorrow cover" />
                    </div>
                </div>
            </div>

            {/* Features Banner */}
            <div className='mx-4 md:mx-12 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                <div className='flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <Truck className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Free Shipping</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>On all orders over $50</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <ShieldCheck className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Secure Checkout</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>100% protected payment</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <DollarSign className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Best Prices</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>Direct publisher savings</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <HelpCircle className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>24/7 Support</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>Help is always available</p>
                    </div>
                </div>
            </div>

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