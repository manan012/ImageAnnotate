import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import datasetsReducer from './datasetsReducer';
import notificationReducer from './notificationReducer';
import errorReducer from './errorReducer';

const appReducer = combineReducers({
    'user': userReducer,
    'projects': projectsReducer,
    'datasets': datasetsReducer,
    'notifications': notificationReducer,
    'errors': errorReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;