import DummyCategories from './DummyCategories'
import './CategoryPicker.css'

export default function CategoryPicker({initialValue, updateValue}) {
  
  const categories = DummyCategories

  return (
    categories.map(category => 
        <div className='category' key={category.id}>
            <img className='icon' src={require('./icons/icon.svg').default} alt='' style={{borderColor: category.color}}/>
            <div className='description'>{ category.name }</div>
        </div>
    )
  )
}