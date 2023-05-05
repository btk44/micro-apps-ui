import './App.scss'
import TransactionEdit from './pages/transaction-edit/TransactionEdit';
import { AuthInterceptor } from './services/interceptor';

function App() {
  AuthInterceptor();

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <Home></Home> */}
      <TransactionEdit></TransactionEdit>
      <footer></footer>
    </div>
  );
}

export default App;
