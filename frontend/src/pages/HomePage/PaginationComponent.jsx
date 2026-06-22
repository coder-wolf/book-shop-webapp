import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

export function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="my-8">
      <PaginationContent className="flex items-center justify-center gap-2">
        <PaginationItem>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg border border-border text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              currentPage === 1 
                ? 'opacity-40 cursor-not-allowed text-muted-foreground' 
                : 'hover:bg-muted text-foreground'
            }`}
          >
            Previous
          </button>
        </PaginationItem>
        
        {pages.map(page => (
          <PaginationItem key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-lg border border-border text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#6C5DD4] border-[#6C5DD4] text-white shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {page}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg border border-border text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              currentPage === totalPages 
                ? 'opacity-40 cursor-not-allowed text-muted-foreground' 
                : 'hover:bg-muted text-foreground'
            }`}
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
