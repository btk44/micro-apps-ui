export interface CurrencySearchFilters {
    code?: string
    description?: string
    id?: number
  }

export function GetDefaultCurrencySearchFilters(): CurrencySearchFilters{
  return {
      code: '',
      description: '',
      id: 0
  }
}
  