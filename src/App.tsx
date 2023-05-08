import './App.scss'
import Router from './Router';
import { AuthInterceptor } from './services/interceptor'

function App() {
  AuthInterceptor();

  return (
    <div className="App">
      <header className="App-header"></header>
      <Router/>
      <footer></footer>
    </div>
  )
}

export default App;
