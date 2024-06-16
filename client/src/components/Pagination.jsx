export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages > 0 ? totalPages : 1).keys()].map(
    (i) => i + 1,
  );

  return (
    <div className="pagination flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 bg-gray-300 rounded"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
};
