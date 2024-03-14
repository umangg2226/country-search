import { useState, useEffect, useCallback } from 'react'
import { Country } from '../types'

const BASE_URL = `https://restcountries.com/v3.1/name/`

const useCountries = (searchTerm: string) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchCountries = useCallback(async () => {
    if (!searchTerm.trim()) {
      setCountries([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${BASE_URL}${searchTerm.trim()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch countries')
      }

      const data = await response.json()

      const countriesData = data.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.png,
      }))

      setCountries(countriesData)
    } catch (error) {
      setCountries([])
    } finally {
      setIsLoading(false)
      setIsLoaded(true)
    }
  }, [searchTerm])

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout

    if (searchTerm.trim()) {
      debounceTimer = setTimeout(() => {
        fetchCountries()
      }, 500)
    } else {
      setIsLoading(false)
      setIsLoaded(false)
      setCountries([])
    }

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, fetchCountries])

  return { countries, isLoading, isLoaded }
}

export default useCountries
