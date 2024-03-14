import { useState, useCallback } from 'react'

const usePagination = (totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / 10)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return { currentPage, totalPages, handlePageChange }
}

export default usePagination
