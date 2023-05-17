export interface Category{
    id: number
    name: string
    ownerId: number
    parentId: number
    subcategories: Array<Category>
    active: boolean

    color: string
    icon: string
}