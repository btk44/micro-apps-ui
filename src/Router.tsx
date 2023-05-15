import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TransactionList from "./pages/transaction-list/TransactionList";
import TransactionEdit from "./pages/transaction-edit/TransactionEdit";

function Router(){
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                <Route index element={<TransactionList />} />
                <Route path="edit" element={<TransactionEdit />} />
                <Route path="*" element={<div>no page!</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
        <Outlet/>
      </>
    )
}

export default Router