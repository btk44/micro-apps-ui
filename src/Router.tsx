import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TransactionList from "./pages/transaction-list/TransactionList";
import TransactionEdit from "./pages/transaction-edit/TransactionEdit";
import CategoryPicker from "./pages/category-picker/CategoryPicker";
import AccountPicker from "./pages/account-picker/AccountPicker";

function Router(){
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                <Route index element={<TransactionList />} />
                <Route path="edit" element={<TransactionEdit />} />
                <Route path="category-picker/:id" element={<CategoryPicker />} />
                <Route path="account-picker" element={<AccountPicker />} />
                <Route path="*" element={<div>no page!</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
        <Outlet/>
      </>
    )
}

export default Router