/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { books } from '@/data/books';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('book_shop_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('book_shop_favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('book_shop_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('book_shop_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToCart = (bookId, quantity = 1) => {
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.bookId === bookId);
            if (existingIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingIndex].quantity += quantity;
                return newCart;
            }
            return [...prevCart, { bookId, quantity }];
        });
    };

    const removeFromCart = (bookId) => {
        setCart(prevCart => prevCart.filter(item => item.bookId !== bookId));
    };

    const updateCartQuantity = (bookId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }
        setCart(prevCart => 
            prevCart.map(item => item.bookId === bookId ? { ...item, quantity } : item)
        );
    };

    const toggleFavorite = (bookId) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(bookId)) {
                return prevFavorites.filter(id => id !== bookId);
            }
            return [...prevFavorites, bookId];
        });
    };

    const isBookFavorite = (bookId) => {
        return favorites.includes(bookId);
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const book = books.find(b => b.id === item.bookId);
            return total + (book ? book.price * item.quantity : 0);
        }, 0);
    };

    return (
        <ShopContext.Provider value={{
            cart,
            favorites,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            toggleFavorite,
            isBookFavorite,
            getCartCount,
            getCartTotal
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
};
