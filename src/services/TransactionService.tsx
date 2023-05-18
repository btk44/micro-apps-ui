import { AccountSearchFilters, GetDefaultAccountSearchFilters } from "../objects/AccountSearchFilters"
import { CategorySearchFilters, GetDefaultCategorySearchFilters } from "../objects/CategorySearchFilters"
import { Transaction } from "../objects/Transaction"
import { GetDefaultTransactionSearchFilters, TransactionSearchFilters } from "../objects/TransactionSearchFilters"
import { CurrencySearchFilters, GetDefaultCurrencySearchFilters } from "../objects/CurrencySearchFilters"

export const TransactionService = {
    apiUrl: 'http://localhost:5000/api',
    transactionUrl: 'Transaction',
    accountUrl: 'Account',
    categoryUrl: 'Category',
    currencyUrl: 'Currency',

    SearchTransactions: async function(filters?: TransactionSearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.transactionUrl}`, { ...GetDefaultTransactionSearchFilters(), ...(filters || {}) })
    },

    SaveTransactions: async function(transactions: Array<Transaction>) {    
        try{
            const processInput = { transactions: transactions }
            const response = await fetch(`${this.apiUrl}/${this.transactionUrl}/process`, { method: 'POST', body: JSON.stringify(processInput) })
            return await response.json()
        } catch(error) {
            return []
        }
    },

    SearchAccounts: async function(filters?: AccountSearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.accountUrl}`, { ...GetDefaultAccountSearchFilters(), ...(filters || {}) })
    },

    SearchCategories: async function(filters?: CategorySearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.categoryUrl}`, { ...GetDefaultCategorySearchFilters(), ...(filters || {}) })
    },

    SearchCurrencies: async function(filters?: CurrencySearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.currencyUrl}`, { ...GetDefaultCurrencySearchFilters(), ...(filters || {}) })
    },

    Search: async function(url: string, filters: any) {
        try{
            const response = await fetch(`${url}/search`, { method: 'POST', body: JSON.stringify(filters) })
            return await response.json()
        } catch(error) {
            return null
        }
    }
}