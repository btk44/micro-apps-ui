import DummyCategories from './DummyCategories'
import './CategoryPicker.css'

export default function CategoryPicker({initialValue, updateValue}) {
  
  const categories = DummyCategories

  function onCategorySelect(categoryId){
    
  }

  function getCategoryList(parentId){
    return (
        <ul className='category-picker'>
          { categories.filter(category => category.parentId === parentId).map(category => 
              <li className='category' key={category.id}>
                <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: category.color}}/>
                <div className='description'>{ category.name }</div>
              </li>
            )
          }
        </ul>
      )
  }

  return getCategoryList(0)
}