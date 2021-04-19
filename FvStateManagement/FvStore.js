import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './FvReducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
