import { createStore } from 'redux';
import reducer from '../reducer/reducer'
const store = createStore(reducer)
console.log(store.getState());
export default store
