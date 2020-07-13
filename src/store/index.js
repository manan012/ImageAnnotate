import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import datasetsReducer from './datasetsReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    'user': userReducer,
    'projects': projectsReducer,
    'datasets': datasetsReducer,
    'notifications': notificationReducer
})

export default rootReducer;