import { createBrowserRouter } from "react-router-dom";
import MobileTransactionList from "./pages/mobile/mobile-transaction-list/MobileTransactionList";
import MobileTransactionEdit from "./pages/mobile/mobile-transaction-edit/MobileTransactionEdit";
import MobileCategoryPicker from "./pages/mobile/mobile-category-picker/MobileCategoryPicker";
import MobileAccountPicker from "./pages/mobile/mobile-account-picker/MobileAccountPicker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileTransactionList />
  },
  {
    path: "mobile-edit",
    element: <MobileTransactionEdit />
  },
  {
    path: "mobile-category-picker/:id",
    element: <MobileCategoryPicker />
  },
  {
    path: "mobile-account-picker",
    element: <MobileAccountPicker />
  },
  {
    path:"*",
    element: <div>no page!</div>
  },
]);

export default router