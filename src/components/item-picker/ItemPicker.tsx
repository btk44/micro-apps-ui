import './ItemPicker.scss'
import { useState } from 'react'
import icon from '../../assets/icon.svg'

interface ItemPickerProps{
  onUpdate(updateValue: any): void 
  onCancel(): void
  sourceItemList: any[]
  childListPropName?: string
  keyPropName: string
  descriptionPropName: string
}

// this is simple version for only 1 level of children
export default function ItemPicker(props: ItemPickerProps) {

  const childListPropName = props.childListPropName ?? ''
  const nestedItemsMode = props.childListPropName && 
                          props.sourceItemList.some((x: any) => x[childListPropName].length)

  const [items, setItems] = useState(props.sourceItemList)

  function hasChildItems(item: any){
    return !!(nestedItemsMode && item[childListPropName]?.length)
  }

  function onItemSelect(item: any){
    if(!hasChildItems(item) )
      props.onUpdate(item)
    else
        setItems(item[childListPropName])
  }
  
  function onBack(){
    if(!nestedItemsMode || items === props.sourceItemList)
      props.onCancel()
    else
      setItems(props.sourceItemList)
  }

  return (
    <div className='item-picker-component'>
      <ul>
        { items.map((item: any) => 
            <li
          key={item[props.keyPropName]} onClick={() => onItemSelect(item)}>
          <img src={icon} alt='' style={{ borderColor: item.color }} />
          <span>{item[props.descriptionPropName]}</span>
          {hasChildItems(item) && <span className='children-indicator'>&#8250;</span>}
        </li> 
          )
        }
      </ul>
      <button onClick={onBack}>back</button>
    </div>


  )
}