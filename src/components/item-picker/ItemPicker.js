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
      <ul>
        { items.map(item => 
            <li
                key={item[keyPropName]} onClick={() => onItemSelect(item)}>
              <img src={require('./icons/icon.svg').default} alt='' style={{borderColor: item.color}}/>
              <span>{ item.name }</span>
              {hasChildItems(item) && <span className='children-indicator'>&#8250;</span> }
            </li> 
          )
        }
      </ul>
      <button onClick={onBack}>back</button>
    </div>


  )
}