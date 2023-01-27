import DummyCategories from './DummyCategories'
import './CategoryPicker.css'
import { useState } from 'react'

export default function CategoryPicker({initialValue, updateValue}) {

  const categoriesSource = DummyCategories
  const [categories, setCategories] = useState({
    activeList: getCategoriesByParentId(initialValue),
    selected: initialValue
  })

  function getCategoriesByParentId(parentId){
    return categoriesSource.filter(category => category.parentId === parentId)
  }

  function hasChildCategories(categoryId){
    return categoriesSource.some(category => category.parentId === categoryId)
  }

  function onCategorySelect(categoryId){
    updateValue(categoryId)
    setCategories({
      activeList: hasChildCategories(categoryId) ? getCategoriesByParentId(categoryId) : categories.activeList,
      selected: categoryId
    })
  }
  
  function onBack(){
    const parentCategoryId = categories.activeList.length ? categories.activeList[0].parentId : null
    if(parentCategoryId === 0)
      return

    const grandParentCategoryId = categoriesSource.filter(category => category.id === parentCategoryId)[0].parentId
    const previousCategories = getCategoriesByParentId(grandParentCategoryId)
    
    updateValue(parentCategoryId)
    setCategories({
      activeList: previousCategories,
      selected: parentCategoryId
    })
  }

  return (
    <ul className='category-picker'>
      <li className='category' key={-1} onClick={onBack}>
        <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: 'black'}}/>
        <div className='description'>back</div>
      </li>
      { categories.activeList.map(category => 
          <li className={`category ${categories.selected === category.id ? 'selected' : ''}`} 
              key={category.id} onClick={() => onCategorySelect(category.id)}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: category.color}}/>
            <div className='description'>{ category.name }</div>
            <div className={`childrenButton ${hasChildCategories(category.id) ? '' : 'hidden'}`}>&#8250;</div>
          </li> 
        )
      }
    </ul>
  )
}