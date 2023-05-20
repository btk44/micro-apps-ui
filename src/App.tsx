import { Provider } from 'react-redux'
import './App.scss'
import Router from './Router'
import { AuthInterceptor } from './services/Interceptor'
import store from './store/Store'

function App() {
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
