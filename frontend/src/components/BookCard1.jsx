import { Link } from "react-router";

const BookCard = ({
    id,
    coverImage,
    title,
}) => {
    const handleButtonClick = (e) => {
        e.stopPropagation(); // 🚀 THIS IS THE MAGIC LINE
        e.preventDefault(); // 🚀 THIS IS THE MAGIC LINE
        // alert("Button clicked without navigating!");
    };

    return (
        <div className='flex flex-col justify-between h-full border rounded-xl p-4 bg-card text-card-foreground shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1'>
            <Link to={`/book/${id}`} className='flex flex-col items-center w-full flex-1'>
                <div className='w-full aspect-[3/4] rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-3 shadow-xs'>
                    <img className='w-full h-full object-cover' src={coverImage} alt={title} />
                </div>
                <div className='flex flex-col items-center text-center w-full'>
                    <h3 className='font-semibold text-sm line-clamp-2 min-h-[2.5rem] flex items-center justify-center text-foreground' title={title}>
                        {title}
                    </h3>
                    <span className='text-[10px] text-muted-foreground tracking-wider uppercase mt-1'>ADVENTURE, SCIENCE</span>
                    <div className='text-amber-500 text-xs mt-2 flex gap-0.5 justify-center'>
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleButtonClick}
                className='w-full mt-4 py-2 px-4 rounded-lg border border-border hover:border-[#6C5DD4] hover:bg-[#6C5DD4] hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer'>
                Add to cart
            </button>
        </div>
    );
};

export default BookCard;