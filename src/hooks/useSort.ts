import { useState, useMemo, useCallback } from 'react'

type SortOrder = 'asc' | 'desc'

const useSort = <T extends object>(
  initialData: T[],
  initialSortKey: keyof T,
  initialSortOrder: SortOrder
) => {
  const [sortKey, setSortKey] = useState<keyof T>(initialSortKey)
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder)

  const sortedData = useMemo(() => {
    if (!sortOrder) return initialData

    const sortedArray = [...initialData].sort((a, b) => {
      const valueA = a[sortKey] as string | number
      const valueB = b[sortKey] as string | number

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
      } else {
        return 0
      }
    })

    return sortedArray
  }, [initialData, sortKey, sortOrder])

  const toggleSort = useCallback(
    (key: keyof T) => {
      if (sortKey === key) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortKey(key)
        setSortOrder('asc')
      }
    },
    [sortKey, sortOrder]
  )

  return { sortedData, toggleSort, sortOrder }
}

export default useSort
