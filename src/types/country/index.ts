export interface Country {
  name: string
  flag: string
}

export interface CountriesTableProps {
  countries: Country[]
  isLoading: boolean
  currentPage: number
  helperMessage: string
}
