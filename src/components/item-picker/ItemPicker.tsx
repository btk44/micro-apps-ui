import React from 'react'
import './ItemPicker.scss'
import { useState } from 'react'

interface ItemPickerProps{
  onUpdate(updateValue: any): void 
  onCancel(): void
  sourceItemList: any[]
  parentPropName?: string
  childListPropName?: string
  keyPropName: string
}

export default function ItemPicker(props: ItemPickerProps) {

  const nestedItemsMode = props.parentPropName && props.childListPropName && 
                          props.sourceItemList.some((x: any) => x[props.childListPropName??''].length) // to do ??''

  const [items, setItems] = useState(props.sourceItemList)

  function hasChildItems(item: any){
    return !!(nestedItemsMode && item[props.childListPropName??''].length)
  }

  function onItemSelect(item: any){
    if(!hasChildItems(item) )
      props.onUpdate(item) // and close this picker
    else
        setItems(item[props.childListPropName??''])
  }
  
  function onBack(){
    const parentItem = nestedItemsMode ? items[0][props.parentPropName??''] : null
    if(!parentItem)
      props.onCancel() // and close this picker
    else
      setItems(parentItem[props.parentPropName??''] ? 
               parentItem[props.parentPropName??''][props.childListPropName??''] : 
               props.sourceItemList)
  }

  return (
    <div className='item-picker-component'>
      <ul>
        { items.map((item: any) => 
            <li
                key={item[props.keyPropName]} onClick={() => onItemSelect(item)}>
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