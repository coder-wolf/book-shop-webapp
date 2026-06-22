import { useShop } from '@/context/ShopContext';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard1';
import { Link } from 'react-router';
import { Heart, ArrowLeft } from 'lucide-react';

const FavoritesPage = () => {
    const { favorites } = useShop();

    // Map favorites array of IDs to actual book objects
    const favoritedBooks = books.filter(book => favorites.includes(book.id));

    return (
        <div className='mx-4 md:mx-12 py-8 text-foreground min-h-[60vh]'>
            {/* Header / Breadcrumb */}
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
                <Link to="/" className='hover:text-primary transition-colors flex items-center gap-1'>
                    <ArrowLeft className='w-4 h-4' /> Back to Catalog
                </Link>
            </div>

            <div className='flex items-center justify-between mb-8 pb-4 border-b border-border'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-3xl font-bold tracking-tight'>My Favorites</h1>
                    <span className='text-xs font-semibold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20'>
                        {favoritedBooks.length} Books
                    </span>
                </div>
            </div>

            {favoritedBooks.length === 0 ? (
                <div className='text-center py-20 border border-dashed border-border rounded-2xl bg-card flex flex-col items-center justify-center px-4 max-w-2xl mx-auto shadow-xs'>
                    <div className='w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-500 mb-4 shadow-sm border border-rose-100/10'>
                        <Heart className='w-8 h-8' />
                    </div>
                    <h3 className='text-lg font-bold text-foreground mb-1'>No Favorites Yet</h3>
                    <p className='text-sm text-muted-foreground max-w-sm mb-6'>
                        Tap the heart icon on any book card or detail page to add books to your favorites collection.
                    </p>
                    <Link 
                        to="/" 
                        className='px-5 py-2.5 bg-[#6C5DD4] hover:bg-[#5b4eb8] text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer'
                    >
                        Explore Catalog
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                    {favoritedBooks.map(book => (
                        <BookCard 
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            coverImage={book.coverImage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
