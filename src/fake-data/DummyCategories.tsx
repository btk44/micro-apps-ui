import { Category } from "../objects/category"

const DummyCategories: any[] = [
    { id: 1, name: 'category 1', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg'},
    { id: 2, name: 'category 2', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 3, name: 'category 3', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 4, name: 'category 4', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 5, name: 'category 5', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 6, name: 'category 6', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 7, name: 'category 7', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 8, name: 'category 8', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 9, name: 'category 9', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 10, name: 'category 10', categoryGroupName: '', color: '#347aeb', icon: 'sth.svg' },
    { id: 11, name: 'category 11', categoryGroupName: 'cg1', color: '#347aeb', icon: 'sth.svg' },
    { id: 12, name: 'category 12', categoryGroupName: 'cg1', color: '#347aeb', icon: 'sth.svg' },
    { id: 13, name: 'category 13', categoryGroupName: 'cg1', color: '#347aeb', icon: 'sth.svg' },
    { id: 14, name: 'category 14', categoryGroupName: 'cg2', color: '#347aeb', icon: 'sth.svg' },
    { id: 15, name: 'category 15', categoryGroupName: 'cg2', color: '#347aeb', icon: 'sth.svg' },
    { id: 16, name: 'category 16', categoryGroupName: 'cg3', color: '#347aeb', icon: 'sth.svg' },
    { id: 17, name: 'category 17', categoryGroupName: 'cg3', color: '#347aeb', icon: 'sth.svg' },
    { id: 18, name: 'category 18', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 19, name: 'category 19', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 20, name: 'category 20', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 21, name: 'category 21', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 22, name: 'category 22', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 23, name: 'category long name', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 24, name: 'category 24', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 25, name: 'category 25', categoryGroupName: 'cg4', color: '#347aeb', icon: 'sth.svg' },
    { id: 26, name: 'category 26', categoryGroupName: 'cg5', color: '#347aeb', icon: 'sth.svg' }
]

// function GetCategoriesTree(): Category[] {
//     const items = DummyCategories.map(x => CreateItem(x))

//     items.forEach(x => {
//         const parentCategoryList = items.filter(y => y.id === x.categoryGroupName)
//         x.childCategories = items.filter(y => y.categoryGroupName === x.id)
//         x.parentCategory = parentCategoryList.length ? parentCategoryList[0] : null
//     })
    
//     return items.filter(x => x.categoryGroupName === 0)
// }

// function CreateItem(x: any): Category{
//     return {
//         id: x.id, 
//         name: x.name, 
//         categoryGroupName: x.categoryGroupName, 
//         color: x.color, 
//         icon: x.icon,
//         parentCategory: null,
//         childCategories: null
//     }
// }

// const CategoriesTree = GetCategoriesTree()

// function GetCategoriesTree(): Category[] {
//     const items = DummyCategories.map(x => CreateItem(x))

//     items.forEach(x => {
//         const parentCategoryList = items.filter(y => y.id === x.categoryGroupName)
//         x.childCategories = items.filter(y => y.categoryGroupName === x.id)
//         x.parentCategory = parentCategoryList.length ? parentCategoryList[0] : null
//     })
    
//     return items.filter(x => x.categoryGroupName === 0)
// }

function GetCategoriesStructure(): any[] {
    const groupKeys = new Set(DummyCategories.map(x => x.categoryGroupName))
    const categoryGroups: any[] = []
    groupKeys.forEach((group, index) => categoryGroups.push(
        {
            id: index,
            name: group,
            childCategories: DummyCategories.filter(x => x.categoryGroupName === group),
            //categoryGroupName: null
        }
    ))

    return categoryGroups;
}

const CategoriesStructure = GetCategoriesStructure()

export { DummyCategories, CategoriesStructure } //CategoriesTree }