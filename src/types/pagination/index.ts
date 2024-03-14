export interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}
