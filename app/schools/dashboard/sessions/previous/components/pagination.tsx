import React from 'react';

type PaginationProps = {
  total: number; // Total number of pages
  page: number; // Current active page
  onChange: (page: number) => void; // Page change handler
};

const Pagination: React.FC<PaginationProps> = ({ total, page, onChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      onChange(newPage);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(total)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            page === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === total}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
