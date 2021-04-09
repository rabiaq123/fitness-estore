import { combineReducers } from 'redux';
import loginReducer from './components/state/reducers/loginReducer'
import isLoginPopup from './components/state/reducers/loginPopupReducer'
import isLogoutPopup from './components/state/reducers/logoutPopupReducer'

import {createStore} from 'redux';

const allReducers = combineReducers({
    isLogged: loginReducer,
    isLoginPopup: isLoginPopup,
    isLogoutPopup: isLogoutPopup

});

let store = createStore(
        allReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;