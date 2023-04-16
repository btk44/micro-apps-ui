import React from 'react';
import './App.scss';
import Home from './pages/Home';
import { AuthInterceptor } from './services/interceptor';

function App() {
  AuthInterceptor();

  return (
    <div className="App">
      <header className="App-header"></header>
      <Home></Home>
      <footer></footer>
    </div>
  );
}

export default App;