export class Category{
    id: number
    name: string
    parentId: number
    color: string
    icon: string
    childCategories: Category[] | null
    parentCategory: Category | null

    constructor() {
        this.id = 0
        this.name = ''
        this.parentId = 0
        this.color = '#000000'
        this.icon = ''
        this.parentCategory = null
        this.childCategories = null
    }
}