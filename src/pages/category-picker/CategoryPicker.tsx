import './CategoryPicker.scss'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { Category } from '../../objects/Category'
import { selectCategories, selectCurrentTransaction, setCurrentTransaction } from '../../store/TransactionSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function CategoryPicker() {
  const { id } = useParams();
  const categories = Object.values(useAppSelector(selectCategories))
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function hasSubcategories(category: Category){
    return category.subcategories.length > 0
  }

  function onCategorySelected(category: Category){
    if (hasSubcategories(category)){
      navigate(`/category-picker/${category.id}`)
    }  
    else {
      dispatch(setCurrentTransaction({ ...currentTransaction, categoryId: category.id } ))
      navigate(category.parentId === 0 ? -1 : -2)
    }
  }

  return (
    <div className='category-picker-component'>
      <ul>
        { categories.filter(category => category.parentId === Number(id)).map(category => 
            <li key={category.id} onClick={() => {onCategorySelected(category)}}>
                <span>{category.name}</span>
                { hasSubcategories(category) && <span className='children-indicator'>&#8250;</span>}
            </li> 
          )
        }
      </ul>
    </div>
  )
}