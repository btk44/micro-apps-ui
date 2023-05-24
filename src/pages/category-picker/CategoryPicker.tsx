import './CategoryPicker.scss'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { Category } from '../../objects/Category'
import { selectCategories, selectCurrentTransaction, setCurrentTransaction } from '../../store/TransactionSlice'
import { Link, useParams } from 'react-router-dom'

export default function CategoryPicker() {
  const { id } = useParams();
  const categories = Object.values(useAppSelector(selectCategories))
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()

  function hasSubcategories(category: Category){
    return category.subcategories.length > 0
  }

  function onCategorySelected(category: Category){
    if (!hasSubcategories(category))
      dispatch(setCurrentTransaction({ ...currentTransaction, categoryId: category.id } ))
  }

  function generateLinkUrl(category: Category) {
    return hasSubcategories(category) ? 
      `/category-picker/${category.id}` :
      '/edit'
  }

  return (
    <div className='category-picker-component'>
      <ul>
        { categories.filter(category => category.parentId === Number(id)).map(category => 
            <li key={category.id} onClick={() => {onCategorySelected(category)}}>
              <Link to={generateLinkUrl(category)}>
                <span>{category.name}</span>
                { hasSubcategories(category) && <span className='children-indicator'>&#8250;</span>}
              </Link>
            </li> 
          )
        }
      </ul>
    </div>
  )
}