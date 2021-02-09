import Todo from './components/todo/todo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom'
import AboutUs from './components/abouUs';
import ContactUs from './components/contactUs';
import Blog from './components/blog';
import ErrorPage from './components/errorPage';
import SingleTask from './components/singleTask';
import NavMenu from './components/navMenu';
// import { NavItem } from 'react-bootstrap';

function App() {

  const routes = [
    {
      path: '/',
      component: Todo
    },
    {
      path: '/about',
      component: AboutUs
    },
    {
      path: '/contact',
      component: ContactUs
    },
    {
      path: '/blog',
      component: Blog
    },
    {
      path: '/singleTask/:id',
      component: SingleTask
    },
    {
      path: '/404',
      component: ErrorPage
    },
  ]

  return (
    <>
      <div className="App">
        <NavMenu />
        <Switch>
          {routes.map((item, index) => <Route
            path={item.path}
            exact
            component={item.component}
            key={index}
          />)
          }
        </Switch>
      </div>
    </>
  );
}

export default App;
