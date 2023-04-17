import { AccountSearchFilters, GetDefaultAccountSearchFilters } from "../objects/accountSearchFilters"
import { CategorySearchFilters, GetDefaultCategorySearchFilters } from "../objects/categorySearchFilters"
import { Transaction } from "../objects/transaction"
import { GetDefaultTransactionSearchFilters, TransactionSearchFilters } from "../objects/transactionSearchFilters"

export const TransactionService = {
    apiUrl: 'https://localhost:5001/api',
    transactionUrl: 'Transaction',
    accountUrl: 'Account',
    categoryUrl: 'Category',

    SearchTransactions: async function(filters?: TransactionSearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.transactionUrl}`, { ...GetDefaultTransactionSearchFilters(), ...filters })
    },

    SaveTransactions: async function(transactions: Array<Transaction>) {    
        try{
            const response = await fetch(`${this.apiUrl}/${this.transactionUrl}`, { method: 'POST', body: JSON.stringify(transactions) })
            return await response.json()
        } catch(error) {
            return []
        }
    },

    SearchAccounts: async function(filters?: AccountSearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.accountUrl}`, { ...GetDefaultAccountSearchFilters(), ...filters })
    },

    SearchCategories: async function(filters?: CategorySearchFilters) {    
        return await this.Search(`${this.apiUrl}/${this.categoryUrl}`, { ...GetDefaultCategorySearchFilters(), ...filters })
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