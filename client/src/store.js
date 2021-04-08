import { combineReducers } from 'redux';
import loginReducer from './components/state/reducers/loginReducer'
import {createStore} from 'redux';

const allReducers = combineReducers({
    isLogged: loginReducer
});

let store = createStore(
        allReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;