import './ItemPicker.scss'
import { useState } from 'react'

export default function ItemPicker({onUpdate, onCancel, sourceItemList, parentPropName, childListPropName, keyPropName}) {

  const nestedItemsMode = parentPropName && childListPropName && 
                          sourceItemList.some(x => x[childListPropName].length)

  const [items, setItems] = useState(sourceItemList)

  function hasChildItems(item){
    return !!(nestedItemsMode && item[childListPropName].length)
  }

  function onItemSelect(item){
    if(!hasChildItems(item) )
        onUpdate(item) // and close this picker
    else
        setItems(item[childListPropName])
  }
  
  function onBack(){
    const parentItem = nestedItemsMode ? items[0][parentPropName] : null
    if(!parentItem)
      onCancel() // and close this picker
    else
      setItems(parentItem[parentPropName] ? parentItem[parentPropName][childListPropName] : sourceItemList)
  }

  return (
    <div className='item-picker'>
      <ul className='item-list'>
        { items.map(item => 
            <li className='item'
                key={item[keyPropName]} onClick={() => onItemSelect(item)}>
              <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: item.color}}/>
              <div className='description'>{ item.name }</div>
              {hasChildItems(item) && <div className='childrenButton'>&#8250;</div> }
            </li> 
          )
        }
      </ul>
      <button onClick={onBack}>back</button>
    </div>


  )
}