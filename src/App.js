import './App.css';
import{ BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home';
import Inventory from './Inventory.js';
import NavBar from './navbar.js';

function App() {
  return (
    <Router>
      <NavBar/>
      <main>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/inventory' exact>
            <Inventory/>
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
