import DummyCategories from './DummyCategories'
import './CategoryPicker.css'
import { useState } from 'react'

export default function CategoryPicker({initialValue, updateValue}) {

  const categoriesSource = DummyCategories
  const [categories, setCategories] = useState({
    categoriesListHtml: getCategoriesListHtml(getCategoriesByParentId(0)),
    parentCategoryId: -1
  })

  function getCategoriesByParentId(parentId){
    return categoriesSource.filter(category => category.parentId === parentId)
  }

  function onCategorySelect(categoryId, categoryParentId){
    setCategories({
      categoriesListHtml: getCategoriesListHtml(getCategoriesByParentId(categoryId)),
      parentCategoryId: categoryParentId
    })
  }
  
  function onBack(){
    if(categories.parentCategoryId === -1)
      return

    const previousCategories = getCategoriesByParentId(categories.parentCategoryId)
    const previousCategoryId = previousCategories[0].parentId
    
    setCategories({
      categoriesListHtml: previousCategories,
      parentCategoryId: previousCategoryId === 0 ? -1 : previousCategoryId 
    })
  }

  function getCategoriesListHtml(categoriesList){
    return (
        <ul className='category-picker'>
          <li className='category' key={-1} onClick={onBack}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: 'black'}}/>
            <div className='description'>back</div>
          </li>
          { categoriesList.map(category => 
              <li className='category' key={category.id} onClick={() => onCategorySelect(category.id, category.parentId)}>
                <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: category.color}}/>
                <div className='description'>{ category.name }</div>
              </li>
            )
          }
        </ul>
      )
  }

  return categories.categoriesListHtml
}