export interface CategorySearchFilters {
    ownerId?: number
    name?: string
    id?: number
    parentId?: number
    active?: boolean
    activeDefined?: boolean
    returnTreeStructure?: boolean
  }

export function GetDefaultCategorySearchFilters(): CategorySearchFilters{
  return {
      ownerId: -1,
      name: '',
      id: 0,
      parentId: 0,
      active: false,
      activeDefined: false,
      returnTreeStructure: true
  }
}
  