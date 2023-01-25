import DummyCategories from './DummyCategories'
import './CategoryPicker.css'
import { useState } from 'react'

export default function CategoryPicker({initialValue, updateValue}) {

  const categoriesSource = DummyCategories
  const [categories, setCategories] = useState(getCategoriesByParentId(0))

  function getCategoriesByParentId(parentId){
    return categoriesSource.filter(category => category.parentId === parentId)
  }

  function hasChildCategories(categoryId){
    return categoriesSource.some(category => category.parentId === categoryId)
  }

  function onCategorySelect(categoryId, categoryParentId){
    if(!hasChildCategories(categoryId))
      return

    setCategories(getCategoriesByParentId(categoryId))
  }
  
  function onBack(){
    const parentCategoryId = categories.length ? categories[0].parentId : null
    if(parentCategoryId === null)
      return

    const grandParentCategoryId = categoriesSource.filter(category => category.id === parentCategoryId)[0].parentId
    const previousCategories = getCategoriesByParentId(grandParentCategoryId)
    
    setCategories(previousCategories)
  }

  return (
    <ul className='category-picker'>
      <li className='category' key={-1} onClick={onBack}>
        <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: 'black'}}/>
        <div className='description'>back</div>
      </li>
      { categories.map(category => 
          <li className='category' key={category.id} onClick={() => onCategorySelect(category.id, category.parentId)}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: category.color}}/>
            <div className='description'>{ category.name }</div>
          </li> 
        )
      }
    </ul>
  )
}