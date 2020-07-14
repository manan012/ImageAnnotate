const defaultState = {
    errors: []
}

const errorReducer = (state=defaultState,action) => {
    if (action.type.endsWith('FAILED') && action.error) {
        return {...state, errors: [action.error, ...state.errors]}
    } else {
        switch (action.type) {
            case 'REMOVE_ERROR':
                return {...state, errors: state.errors.filter(err => err !== action.error)}
            default:
                return state;
        }
    }
}

export default errorReducer;