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
        case 'DELETE_PROJECT':
            return {...state, status: "DELETING_PROJECT"}
        case 'DELETE_PROJECT_SUCCESS':
            return {...state, status: "DELETED_PROJECT", 
                    projects: state.projects.filter(p => p._id !== action.id)
                }
        case 'DELETE_PROJECT_FAILED':
            return {...state, status: "DELETE_PROJECT_SUCCESS", error: action.error}
        case 'ADD_PROJECT':
            return {...state, status: 'ADDING_PROJECT'}
        case 'ADD_PROJECT_SUCCESS':
            return {...state, status: 'ADD_PROJECT_SUCCESS', projects: [action.project, ...state.projects]}
        case 'ADD_PROJECT_FAILED':
            return {...state, status: 'ADD_PROJECT_FAILED', error: action.error}
        default:
            return state;
    }
}

export default projectsReducer;