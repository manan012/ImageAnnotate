import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import datasetsReducer from './datasetsReducer';
import notificationReducer from './notificationReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    'user': userReducer,
    'projects': projectsReducer,
    'datasets': datasetsReducer,
    'notifications': notificationReducer,
    'errors': errorReducer
})

export default rootReducer;