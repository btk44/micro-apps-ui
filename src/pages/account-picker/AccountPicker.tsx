import './AccountPicker.scss'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectAccounts, selectCurrentTransaction, setCurrentTransaction } from '../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'
import { Account } from '../../objects/Account'

export default function AccountPicker() {
  const accounts = Object.values(useAppSelector(selectAccounts))
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function onCategorySelected(account: Account){
      dispatch(setCurrentTransaction({ ...currentTransaction, accountId: account.id } ))
      navigate(-1)
  }

  return (
    <div className='account-picker-component'>
      <ul>
        { accounts.map(account => 
            <li key={account.id} onClick={() => {onCategorySelected(account)}}>
                <span>{account.name}</span>
            </li> 
          )
        }
      </ul>
    </div>
  )
}