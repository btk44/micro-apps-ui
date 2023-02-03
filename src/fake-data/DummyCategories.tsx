import { Category } from "../objects/category"

const DummyCategories: any[] = [
    { id: 1, name: 'category 1', parentId: 0, color: '#347aeb', icon: 'sth.svg'},
    { id: 2, name: 'category 2', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 3, name: 'category 3', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 4, name: 'category 4', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 5, name: 'category 5', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 6, name: 'category 6', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 7, name: 'category 7', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 8, name: 'category 8', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 9, name: 'category 9', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 10, name: 'category 10', parentId: 0, color: '#347aeb', icon: 'sth.svg' },
    { id: 11, name: 'category 11', parentId: 1, color: '#347aeb', icon: 'sth.svg' },
    { id: 12, name: 'category 12', parentId: 1, color: '#347aeb', icon: 'sth.svg' },
    { id: 13, name: 'category 13', parentId: 1, color: '#347aeb', icon: 'sth.svg' },
    { id: 14, name: 'category 14', parentId: 2, color: '#347aeb', icon: 'sth.svg' },
    { id: 15, name: 'category 15', parentId: 2, color: '#347aeb', icon: 'sth.svg' },
    { id: 16, name: 'category 16', parentId: 3, color: '#347aeb', icon: 'sth.svg' },
    { id: 17, name: 'category 17', parentId: 3, color: '#347aeb', icon: 'sth.svg' },
    { id: 18, name: 'category 18', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 19, name: 'category 19', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 20, name: 'category 20', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 21, name: 'category 21', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 22, name: 'category 22', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 23, name: 'category long name', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 24, name: 'category 24', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 25, name: 'category 25', parentId: 4, color: '#347aeb', icon: 'sth.svg' },
    { id: 26, name: 'category 26', parentId: 20, color: '#347aeb', icon: 'sth.svg' }
]

function GetCategoriesTree(): Category[] {
    const items = DummyCategories.map(x => CreateItem(x))

    items.forEach(x => {
        const parentCategoryList = items.filter(y => y.id === x.parentId)
        x.childCategories = items.filter(y => y.parentId === x.id)
        x.parentCategory = parentCategoryList.length ? parentCategoryList[0] : null
    })
    
    return items.filter(x => x.parentId === 0)
}

function CreateItem(x: any): Category{
    return {
        id: x.id, 
        name: x.name, 
        parentId: x.parentId, 
        color: x.color, 
        icon: x.icon,
        parentCategory: null,
        childCategories: null
    }
}

const CategoriesTree = GetCategoriesTree()

export { DummyCategories, CategoriesTree }