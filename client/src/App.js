import {Provider} from 'react-redux';
import store from '../src/store/store';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Home from './components/Home';

import {getClasses} from './store/actions/classActions'
import {getCourses} from './store/actions/courseActions'
import {getStudent} from './store/actions/studentActions'

store.dispatch(getCourses());
store.dispatch(getClasses());
store.dispatch(getCourses());


function App() {
  return (
    <Provider {...{store}}>
       <Router>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
          </Routes>
       </Router>
    </Provider>
  );
}

export default App;
