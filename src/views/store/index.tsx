import {createStore} from 'redux';
import {storeActive} from "./reducers"
const store=createStore(storeActive);
export default store