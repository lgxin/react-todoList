import {createStore} from 'redux';
import reducer from './reducer';


const store = createStore(
    reducer, 
    // 调试 redux
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;