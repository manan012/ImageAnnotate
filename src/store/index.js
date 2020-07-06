const { combineReducers } = require("redux");
const { default: userReducer } = require("./userReducer");

const rootReducer = combineReducers({
    'user': userReducer,
})

export default rootReducer;