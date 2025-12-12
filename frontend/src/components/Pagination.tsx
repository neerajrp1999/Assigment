
import React from "react";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const getPageNumbers = () => {
    const pages = [];

    // Range around current page
    const start = Math.max(2, currentPage - 5);
    const end = Math.min(totalPages - 1, currentPage + 5);

    // Always show first page
    pages.push(1);

    // Left ellipsis
    if (start > 2) pages.push("left-dots");

    // Main range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right ellipsis
    if (end < totalPages - 1) pages.push("right-dots");

    // Always show last page (if more than 1 page)
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 gap-3">
      {/* PREV */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p: number) => p - 1)}
        className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* PAGE BUTTONS */}
      {pageNumbers.map((num, idx) =>
        num === "left-dots" || num === "right-dots" ? (
          <span key={idx} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-2 rounded ${
              currentPage === num ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </button>
        )
      )}

      {/* NEXT */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;