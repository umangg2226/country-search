import React, { useCallback, memo } from 'react'
import { PaginationProps } from '../types'

const Pagination: React.FC<PaginationProps> = memo(
  ({ currentPage, totalPages, handlePageChange }) => {
    const renderPagination = useCallback(() => {
      if (totalPages === 1) return null

      const pageNumbers = []
      const maxPagesToShow = 3
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
      let endPage = startPage + maxPagesToShow - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      if (startPage > 1) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        )
        if (startPage > 2) {
          pageNumbers.push(<span key='ellipsis-start'>...</span>)
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={currentPage === i ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        )
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(<span key='ellipsis-end'>...</span>)
        }
        pageNumbers.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        )
      }

      return <div className='pagination'>{pageNumbers}</div>
    }, [currentPage, totalPages, handlePageChange])

    return renderPagination()
  }
)

export default Pagination
