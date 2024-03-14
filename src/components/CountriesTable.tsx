import React, { useCallback, memo } from 'react'
import { CountriesTableProps } from '../types'
import { useSort } from '../hooks'

const CountriesTable: React.FC<CountriesTableProps> = memo(
  ({ countries, isLoading, currentPage, helperMessage }) => {
    const { sortedData, toggleSort, sortOrder } = useSort(
      countries,
      'name',
      'asc'
    )

    const renderCountries = useCallback(() => {
      const startIndex = (currentPage - 1) * 10
      const endIndex = startIndex + 10
      const pageCountries = sortedData.slice(startIndex, endIndex)

      if (isLoading) {
        return <div className='spinner'></div>
      }

      if (sortedData.length === 0) {
        return <p className='no-results'>{helperMessage}</p>
      }

      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => toggleSort('name')}
                className={`sort-header ${
                  sortOrder === 'asc'
                    ? 'sort-asc'
                    : sortOrder === 'desc'
                    ? 'sort-desc'
                    : ''
                }`}
              >
                Country Name <span className='sort-icon'>&#9650;</span>
              </th>
              <th>Country Flag</th>
            </tr>
          </thead>
          <tbody>
            {pageCountries.map((country, index) => (
              <tr key={country.name}>
                <td>{startIndex + index + 1}</td>
                <td>{country.name}</td>
                <td>
                  <img src={country.flag} alt={`${country.name} flag`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }, [
      sortedData,
      isLoading,
      currentPage,
      helperMessage,
      toggleSort,
      sortOrder,
    ])

    return <div className='table-container'>{renderCountries()}</div>
  }
)

export default CountriesTable
