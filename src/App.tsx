import React, { useState, useMemo } from 'react'
import SearchBox from './components/SearchBox'
import { CountriesTable, Pagination, ErrorFallBackRoot } from './components'
import { useCountries, usePagination } from './hooks'
import { shortcutMessage } from './utils'
import { ErrorBoundary } from 'react-error-boundary'

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { countries, isLoading, isLoaded } = useCountries(searchTerm)

  const { currentPage, totalPages, handlePageChange } = usePagination(
    countries.length
  )

  const helperMessage = useMemo(() => {
    return isLoaded && !countries.length && searchTerm.trim()
      ? 'No results found'
      : `Start Searching ${shortcutMessage}`
  }, [isLoaded, countries.length, searchTerm])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallBackRoot}>
      <div className='app'>
        <div className='container'>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CountriesTable
            countries={countries}
            isLoading={isLoading}
            currentPage={currentPage}
            helperMessage={helperMessage}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
