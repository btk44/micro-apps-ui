import './ItemPicker.css'
import { useState } from 'react'

export default function ItemPicker2({onUpdate, onCancel, sourceItemList, parentPropName, childListPropName, keyPropName}) {

//   const nestedItemsMode = parentPropName && childListPropName && 
//                           sourceItemList.some(x => x[parentPropName] != null) &&
//                           sourceItemList.some(x => x[childListPropName].length)

  const [items, setItems] = useState(sourceItemList)

  function hasChildItems(item){
    return item[childListPropName].length
  }

  function onItemSelect(item){
    if(!hasChildItems(item) )
        onUpdate(item) // and close this picker
    else
        setItems(item[childListPropName])
  }
  
  function onBack(){
    const parentItem = items[0][parentPropName]
    if(!parentItem)
      onCancel() // and close this picker
    else
      setItems(parentItem[parentPropName] ? parentItem[parentPropName][childListPropName] : sourceItemList)
  }

  return (
    <ul className='item-picker'>
      <li className='item' key={-1} onClick={onBack}>
        <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: 'black'}}/>
        <div className='description'>back</div>
      </li>
      { items.map(item => 
          <li className='item'
              key={item[keyPropName]} onClick={() => onItemSelect(item)}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: item.color}}/>
            <div className='description'>{ item.name }</div>
            <div className={`childrenButton ${hasChildItems(item) ? '' : 'hidden'}`}>&#8250;</div>
          </li> 
        )
      }
    </ul>
  )
}