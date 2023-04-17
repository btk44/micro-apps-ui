export interface CategorySearchFilters {
    ownerId?: number
    name?: string
    id?: number
    categoryGroupName?: string
    active?: boolean
    activeDefined?: boolean
    take?: number
    offset?: number
  }

  export function GetDefaultCategorySearchFilters(){
    return {
        ownerId: -1,
        name: '',
        id: 0,
        categoryGroupName: '',
        active: false,
        activeDefined: false,
        take: 0,
        offset: 0
    }
  }
  