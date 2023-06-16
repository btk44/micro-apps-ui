import './App.scss'

import { Provider } from 'react-redux'
import { AuthInterceptor } from './services/Interceptor'
import store from './store/Store'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import StoreInitializer from './store/StoreInitializer'


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
        <StoreInitializer></StoreInitializer>
        <RouterProvider router={router} />
        <footer></footer>
      </div>
    </Provider>
  )
}

export default App;
