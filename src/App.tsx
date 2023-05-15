import { Provider } from 'react-redux'
import './App.scss'
import Router from './Router'
import { AuthInterceptor } from './services/interceptor'
import store from './store/Store'

function App() {
  AuthInterceptor();

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header"></header>
        <Router/>
        <footer></footer>
      </div>
    </Provider>
  )
}

export default App;
