import './App.scss'
import TransactionList from './pages/transaction-list/TransactionList'
import TransactionEdit from './pages/transaction-edit/TransactionEdit'
import { AuthInterceptor } from './services/interceptor'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <TransactionList></TransactionList>,
    errorElement: <div>404!</div>,
    children: [
      {
        path: "/edit",
        element: <TransactionEdit></TransactionEdit>,
        errorElement: <div>404!</div>
      },
    ]
  },
]);

function App() {
  AuthInterceptor();

  return (
    <div className="App">
      <header className="App-header"></header>
      <RouterProvider router={router} />
      <footer></footer>
    </div>
  );
}

export default App;
