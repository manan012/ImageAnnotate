const defaultState = {
    status: 'NOT_FETCHED',
    notifications: []
}

const notificationReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'FETCH_NOTIFICATION':
            return {...state, status: 'FETCHING_NOTIFICATIONS'}
        case 'FETCH_NOTIFICATION_SUCCESS':
            return {...state, status: 'FETCH_NOTIFICATION_SUCCESS', notifications: action.notifications}
        case 'FETCH_NOTIFICATION_FAILED':
            return {...state, status: 'FETCH_NOTIFICATION_FAILED', error: action.error}
        case 'ACCEPT_INVITATION_SUCCESS': {
            return {...state, notifications: state.notifications.filter(n=> n._id != action.id)}
        }
        case 'REJECT_INVITATION_SUCCESS': {
            console.log('from notification', action);
            return {...state, notifications: state.notifications.filter(n=> n._id != action.id)}
        }
        default:
            return state;
    }
}

export default notificationReducer;