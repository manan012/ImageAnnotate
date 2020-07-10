const defaultState = {
    status: '',
    loggedIn: false,
}

function userReducer(state=defaultState, action) {
    switch (action.type) {
        case 'VERIFY_TOKEN':
            return {...state, status: 'VERIFYING_TOKEN'}
        case 'VERIFY_TOKEN_SUCCESS':
            return {...state, loggedIn: true, status: 'TOKEN_VERIFIED', token: action.token, userId: action.userId}
        case 'VERIFY_TOKEN_FAILED':
            return {...state, status: 'VERIFY_TOKEN_FAILED', loggedIn: false, error: action.error}
        case 'LOGIN':
            return {...state, status: 'LOGGIN_IN'}
        case 'LOGIN_SUCCESS':
            return {...state, status: 'LOGIN_SUCCESS', loggedIn: true, token: action.token}
        case 'LOGIN_FAILED':
            return {...state, status: "LOGIN_FAILED", loggedIn: false, token: "", error: action.error}
        default:
            return state;
    }
}

export default userReducer;