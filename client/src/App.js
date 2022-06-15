import {Provider} from 'react-redux';
import store from '../src/store/store';

function App() {
  return (
    <Provider {...{store}}>
       <h1>Test App</h1>
    </Provider>
  );
}

export default App;
