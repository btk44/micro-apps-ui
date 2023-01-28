import './ItemPicker.css'
import { useState } from 'react'

export default function ItemPicker({initialValue, updateValue, sourceItemList}) {

  const [items, setItems] = useState({
    activeList: getItemsByParentId(initialValue),
    selected: initialValue
  })

  function getItemsByParentId(parentId){
    return sourceItemList.filter(item => item.parentId === parentId)
  }

  function hasChildItems(itemId){
    return sourceItemList.some(item => item.parentId === itemId)
  }

  function onItemSelect(itemId){
    updateValue(itemId)
    setItems({
      activeList: hasChildItems(itemId) ? getItemsByParentId(itemId) : items.activeList,
      selected: itemId
    })
  }
  
  function onBack(){
    const parentCategoryId = items.activeList.length ? items.activeList[0].parentId : null
    if(parentCategoryId === 0)
      return

    const grandParentCategoryId = sourceItemList.filter(item => item.id === parentCategoryId)[0].parentId
    const previousCategories = getItemsByParentId(grandParentCategoryId)
    
    updateValue(parentCategoryId)
    setItems({
      activeList: previousCategories,
      selected: parentCategoryId
    })
  }

  return (
    <ul className='item-picker'>
      <li className='item' key={-1} onClick={onBack}>
        <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: 'black'}}/>
        <div className='description'>back</div>
      </li>
      { items.activeList.map(item => 
          <li className={`item ${items.selected === item.id ? 'selected' : ''}`} 
              key={item.id} onClick={() => onItemSelect(item.id)}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: item.color}}/>
            <div className='description'>{ item.name }</div>
            <div className={`childrenButton ${hasChildItems(item.id) ? '' : 'hidden'}`}>&#8250;</div>
          </li> 
        )
      }
    </ul>
  )
}