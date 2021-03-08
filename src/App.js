import Todo from './components/todo/todo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom'
import AboutUs from './components/about/abouUs';
import ContactUs from './components/contact/contactUs';
import Blog from './components/blog/blog';
import ErrorPage from './components/error/errorPage';
import SingleTask from './components/singltask/singleTask';
import NavMenu from './components/navmenu/navMenu';
import Lifesicle from './components/lifeSicle/lifesSicles'
import CounterHook from './components/hooks/hooks'
import A from './components/reactContext/A'
import Counter from "./components/reduxExample/counter"

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
      path: '/lifeSicle',
      component: Lifesicle
    },
    {
      path: '/counterhooks',
      component: CounterHook
    },
    {
      path: '/reactcontext',
      component: A
    },
    {
      path: '/redux',
      component: Counter
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
