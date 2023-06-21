import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectOwnerId } from "./UserSlice";
import { initTransactionStore } from "./TransactionSlice";
import { storeLocalStorageKey } from "./Store";

export default function StoreInitializer() {
    const dispatch = useAppDispatch()
    const ownerId = useAppSelector(selectOwnerId)
  
    useEffect(() => {
      if (!localStorage.getItem(storeLocalStorageKey)){
        dispatch(initTransactionStore(ownerId))
        localStorage.setItem(storeLocalStorageKey, 'initalized')
      }
    }, []);

  return (<></>)
}