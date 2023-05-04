import React from 'react';
import './App.scss';
import Home from './pages/home/Home';
import { AuthInterceptor } from './services/interceptor';
import TransactionEdit from './pages/transaction-edit/TransactionEdit';

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