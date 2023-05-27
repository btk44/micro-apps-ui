import { Provider } from 'react-redux'
import './App.scss'
import Router from './Router'
import { AuthInterceptor } from './services/Interceptor'
import store from './store/Store'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    document.documentElement.classList.add('html');
    document.documentElement.classList.add('mobile-html');
    document.documentElement.classList.add('light-theme');
  }, []);
  
  AuthInterceptor();

  return (
    <Provider store={store}>
      <div className="app light-theme">
        <header className="app-header"></header>
        <Router/>
        <footer></footer>
      </div>
    </Provider>
  )
}

export default App;
