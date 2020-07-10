import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import datasetsReducer from './datasetsReducer';

const rootReducer = combineReducers({
    'user': userReducer,
    'projects': projectsReducer,
    'datasets': datasetsReducer
})

export default rootReducer;