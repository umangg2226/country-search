import React, { useRef, useCallback, memo } from 'react'
import { useKeyboardShortcut } from '../hooks'
import { SearchBoxProps } from '../types'

const SearchBox: React.FC<SearchBoxProps> = memo(
  ({ searchTerm, setSearchTerm }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const focusInputRef = useCallback(() => {
      inputRef.current?.focus()
    }, [])

    useKeyboardShortcut('k', focusInputRef)

    return (
      <div className='search-container'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Enter country name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    )
  }
)

export default SearchBox
