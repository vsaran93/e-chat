import { combineReducers } from 'redux';
import * as user from './userReducer';


const reducers = combineReducers({
    user: user
});

export default reducers;