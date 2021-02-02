import Todo from './components/todo/todo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect} from 'react-router-dom'
import AboutUs from './components/abouUs';
import ContactUs from './components/contactUs';
import Blog from './components/blog';
import ErrorPage from './components/errorPage';
import SingleTask from './components/singleTask';
import NavMenu from './components/navMenu';

function App() {
  return (
    <>
      <div className="App">
        <NavMenu />
        <Switch>
          <Route path='/' exact component={Todo} />
          <Route path='/about' exact component={AboutUs} />
          <Route path='/contact' exact component={ContactUs} />
          <Route path='/blog' exact component={Blog} />
          <Route path='/task/:id' exact component={SingleTask} />
          <Route path='/404' exact component={ErrorPage} />
          <Redirect to='/404' />

        </Switch>
      </div>
    </>
  );
}

export default App;
