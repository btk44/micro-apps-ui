import { GetDefaultTransactionSearchFilters, TransactionSearchFilters } from "../objects/transactionSearchFilters"

export const TransactionService = {
    apiUrl: 'https://localhost:5001/api',
    transactionUrl: 'Transaction',
    accountUrl: 'Account',
    categoryUrl: 'Category',

    SearchTransactions: async function(filters?: TransactionSearchFilters) {    
        const searchFilters = { ...GetDefaultTransactionSearchFilters(), ...filters }

        try{
            const response = await fetch(`${this.apiUrl}/${this.transactionUrl}/search`, { method: 'POST', body: JSON.stringify(searchFilters) })
            return await response.json()
        }catch(error) {
            return []
        }
    }
}