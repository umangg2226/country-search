import { useState, useEffect, useCallback, useRef } from 'react'
import { Country } from '../types'

const BASE_URL = `https://restcountries.com/v3.1/name/`

const useCountries = (searchTerm: string) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchCountries = useCallback(async () => {
    if (!searchTerm.trim()) {
      setCountries([])
      return
    }

    setIsLoading(true)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()

    abortControllerRef.current = abortController

    try {
      const response = await fetch(`${BASE_URL}${searchTerm.trim()}`, {
        signal: abortController.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

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
      if ((error as Error).message !== 'The user aborted a request.') {
        setCountries([])
      }
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
      }, 250)
    } else {
      setIsLoading(false)
      setIsLoaded(false)
      setCountries([])
    }

    return () => {
      clearTimeout(debounceTimer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
    }
  }, [searchTerm, fetchCountries])

  return { countries, isLoading, isLoaded }
}

export default useCountries
