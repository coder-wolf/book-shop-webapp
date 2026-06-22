import { Truck, ShieldCheck, DollarSign, HelpCircle, Mail, RotateCcw } from 'lucide-react';
import React from 'react';

const HeroSection = () => {
    return (
        <div>
            <div className='mx-4 md:mx-12 rounded-4xl bg-linear-to-r from-[#4f34fb] to-[#302b50] p-8 md:p-12 text-white shadow-xl mb-12 flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden relative'>
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
                <div className='flex items-center gap-4 p-5 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <Truck className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Free Shipping</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>On all orders over $50</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <ShieldCheck className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Secure Checkout</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>100% protected payment</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <DollarSign className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>Best Prices</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>Direct publisher savings</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-5 rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs'>
                    <div className='w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[#6C5DD4] shrink-0 shadow-xs'>
                        <HelpCircle className='w-6 h-6' />
                    </div>
                    <div>
                        <h3 className='font-bold text-sm'>24/7 Support</h3>
                        <p className='text-xs text-muted-foreground mt-0.5'>Help is always available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;