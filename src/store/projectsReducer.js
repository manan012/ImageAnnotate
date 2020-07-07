const defaultState = {
    status: "NOT_FETCHED",
    projects: []
}

const projectsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {...state, status: "FETCHING_PROJECTS"}
        case 'FETCH_PROJECTS_SUCCESS':
            return {...state, status: "FETCHED_PROJECTS", projects: action.projects}
        case 'FETCH_PROJECTS_FAILED':
            return {...state, status: "FETCHING_PROJECTS_FAILED", error: action.error}
        default:
            return state;
    }
}

export default projectsReducer;