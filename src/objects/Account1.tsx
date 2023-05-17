export interface Account {
    id: number
    name: string
    ownerId: number
    currencyId: number
    amount: number
    active: boolean

    color: string
    icon: string
}