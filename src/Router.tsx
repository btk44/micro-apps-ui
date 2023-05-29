import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TransactionList from "./pages/mobile/mobile-transaction-list/MobileTransactionList";
import TransactionEdit from "./pages/mobile/mobile-transaction-edit/MobileTransactionEdit";
import CategoryPicker from "./pages/mobile/mobile-category-picker/MobileCategoryPicker";
import MobileAccountPicker from "./pages/mobile/mobile-account-picker/MobileAccountPicker";


function Router(){
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                <Route index element={<TransactionList />} />
                <Route path="mobile-edit" element={<TransactionEdit />} />
                <Route path="mobile-category-picker/:id" element={<CategoryPicker />} />
                <Route path="mobile-account-picker" element={<MobileAccountPicker />} />
                <Route path="*" element={<div>no page!</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
        <Outlet/>
      </>
    )
}

export default Router