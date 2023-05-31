export interface Category{
    id: number
    name: string
    ownerId: number
    parentId: number
    subcategories: Array<Category>
    active: boolean
    typeId: number

    color: string
    icon: string
}