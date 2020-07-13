const defaultState = {
    status: '',
    loggedIn: false,
}

function userReducer(state=defaultState, action) {
    switch (action.type) {
        case 'VERIFY_TOKEN':
            return {...state, status: 'VERIFYING_TOKEN'}
        case 'VERIFY_TOKEN_SUCCESS':
            return {...state, loggedIn: true, status: 'TOKEN_VERIFIED', ...action.user, token: action.token}
        case 'VERIFY_TOKEN_FAILED':
            return {...state, status: 'VERIFY_TOKEN_FAILED', loggedIn: false, error: action.error}
        case 'LOGIN':
            return {...state, status: 'LOGGIN_IN'}
        case 'LOGIN_SUCCESS':
            return {...state, status: 'LOGIN_SUCCESS', loggedIn: true, ...action.user, token: action.token}
        case 'LOGIN_FAILED':
            return {...state, status: "LOGIN_FAILED", loggedIn: false, token: "", error: action.error}
        case 'LOGOUT': 
            return {...state, status: 'LOGOUT', loggedIn: false, token: ""}
        case 'SIGNUP':
            return {...state, status: 'SIGNINGUP'}
        case 'SIGNUP_SUCCESS':
            return {...state, status: 'LOGIN_SUCCESS', loggedIn: true, ...action.user, token: action.token}
        case 'SIGNUP_FAILED':
            return {...state, status: 'SIGNUP_FAILED', loggedIn: false, token: "", error: action.error}
        default:
            return state;
    }
}

export default userReducer;