import { TransactionType } from "../constants/transaction-type"
import { Transaction } from "../objects/transaction"

const DummyAccounts: Transaction[] = [
    { id: 1, accountId: 1, categoryId: 1, amount: -1.93, date: new Date(2000, 2, 3), payee: 'test', type: TransactionType.Expense},
    { id: 2, accountId: 2, categoryId: 2, amount: -121.93, date: new Date(2000, 2, 2), payee: 'test', type: TransactionType.Expense},
    { id: 3, accountId: 2, categoryId: 4, amount: 111.93, date: new Date(2000, 3, 3), payee: 'test', type: TransactionType.Income},
    { id: 4, accountId: 1, categoryId: 17, amount: -1.3, date: new Date(2000, 5, 3), payee: 'test', type: TransactionType.Expense},
    { id: 5, accountId: 3, categoryId: 4, amount: 4.5, date: new Date(2000, 5, 3), payee: 'test', type: TransactionType.Income},
    { id: 6, accountId: 3, categoryId: 8, amount: -1.93, date: new Date(2000, 6, 13), payee: 'test', type: TransactionType.Expense},
    { id: 7, accountId: 4, categoryId: 1, amount: -1.93, date: new Date(2000, 6, 23), payee: 'test', type: TransactionType.Expense},
    { id: 8, accountId: 4, categoryId: 1, amount: -1.93, date: new Date(2000, 6, 23), payee: 'test', type: TransactionType.Expense},
    { id: 9, accountId: 5, categoryId: 1, amount: -1.93, date: new Date(2000, 4, 3), payee: 'test', type: TransactionType.Expense},
    { id: 10, accountId: 7, categoryId: 24, amount: -1.93, date: new Date(2000, 8, 30), payee: 'test', type: TransactionType.Expense},
    { id: 11, accountId: 7, categoryId: 2, amount: -1.93, date: new Date(2000, 10, 13), payee: 'test', type: TransactionType.Expense},
    { id: 12, accountId: 7, categoryId: 2, amount: -1.93, date: new Date(2000, 3, 5),  payee: 'test', type: TransactionType.Expense},
]

export default DummyAccounts