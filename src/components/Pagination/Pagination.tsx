import React, { useState, useEffect } from 'react';

import './Pagination.css'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0)
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
    setVisiblePages(calculateVisiblePages(currentPage, totalPages))
  }, [totalItems, itemsPerPage, currentPage, totalPages])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const handlePrevClick = () => {
    handlePageChange(currentPage - 1)
  }

  const handleNextClick = () => {
    handlePageChange(currentPage + 1)
  }

  const calculateVisiblePages = (currentPage: number, totalPages: number): number[] => {
    const maxVisiblePages = 5
    const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
  }

  return (
    <div className="pagination-container">
      <button
        type='button'
        className='page-number no-background'
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <div className='arrow-left' />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type='button'
          onClick={() => handlePageChange(page)}
          className={'page-number'.concat(currentPage === page ? ' current-page' : '')}
        >
          {page}
        </button>
      ))}

      <button
        type='button'
        className='page-number no-background'
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        <div className='arrow-right' />
      </button>
    </div>
  )
}
