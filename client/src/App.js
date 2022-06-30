import {Provider} from 'react-redux';
import store from '../src/store/store';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Home from './components/Home';




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
