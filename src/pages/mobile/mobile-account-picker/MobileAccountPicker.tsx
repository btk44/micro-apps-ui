import './MobileAccountPicker.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectAccounts, selectCurrentTransaction, setCurrentTransaction } from '../../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../../Router'
import { Account } from '../../../objects/Account'

export default function MobileAccountPicker() {
  const accounts = Object.values(useAppSelector(selectAccounts))
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const isPrimary = query.get('isPrimary') === 'true'

  function onAccountSelected(account: Account){
    const modifiedTransaction = structuredClone(currentTransaction)
    if(isPrimary)
      modifiedTransaction.accountId = account.id
    else if(modifiedTransaction.groupTransactions?.length)
      modifiedTransaction.groupTransactions[0].accountId = account.id

    dispatch(setCurrentTransaction(modifiedTransaction))
    navigate(-1)
  }

  return (
    <div className='mobile-account-picker-component'>
      <ul>
        { accounts.map(account => 
            <li key={account.id} onClick={() => {onAccountSelected(account)}}>
                <span>{account.name}</span>
            </li> 
          )
        }
      </ul>
    </div>
  )
}