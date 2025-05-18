import React from "react";
import "./pagination.css";

interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (skip: number) => void;
}

export function Pagination({ total, limit, skip, onPageChange }: PaginationProps) {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePrevious = () => {
    if (skip >= limit) {
      onPageChange(skip - limit);
    }
  };

  const handleNext = () => {
    if (skip + limit < total) {
      onPageChange(skip + limit);
    }
  };

  if (total <= limit) return null;

  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevious}
        disabled={skip === 0}
        className={`pagination-button ${
          skip === 0 ? "pagination-button--disabled" : ""
        }`}
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={skip + limit >= total}
        className={`pagination-button ${
          skip + limit >= total ? "pagination-button--disabled" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}
