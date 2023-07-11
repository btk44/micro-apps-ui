import './MobileAccountPicker.scss'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectAccounts, selectCurrentTransaction, setCurrentTransaction } from '../../../store/TransactionSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Account } from '../../../objects/Account'

export default function MobileAccountPicker() {
  const accounts = Object.values(useAppSelector(selectAccounts))
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { isPrimary } = useParams();

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