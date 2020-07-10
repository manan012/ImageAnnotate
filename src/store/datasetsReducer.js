const defaultState = {
    status: 'NOT_FETCHED',
    datasets: [],
    dataset: {
        status: 'NOT_FETCHED'
    }
}

const datasetsReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'FETCH_DATASET':
            return {...state, dataset: {status: 'FETCHING_DATASET'}}
        case 'FETCH_DATASET_SUCCESS':
            return {...state, dataset: {status: 'FETCH_DATASET_SUCCESS', ...action.dataset}}
        case 'FETCH_DATASET_FAILED':
            return {...state, dataset: {staus: 'FETCH_DATASET_FAILED', error: action.error}}
        case 'FETCH_DATASETS':
            return {...state, status: 'FETCHING_DATASETS'}
        case 'FETCH_DATASETS_SUCCESS':
            return {...state, status: 'FETCH_DATASETS_SUCCESS', datasets: action.datasets}
        case 'FETCH_DATASETS_ERROR':
            return {...state, status: 'FETCH_DATASETS_FAILED', error: action.error}
        case 'CREATE_DATASET_WITH_IMAGES':
            return {...state, status: 'CREATING_DATASET_WITH_IMAGES'}
        case 'CREATE_DATASET_WITH_IMAGES_SUCCESS':
            return {...state, status: 'CREATE_DATASET_WITH_IMAGE_SUCCESS', datasets: [action.dataset, ...state.datasets]}
        case 'CREATE_DATASET_WITH_IMAGES_ERROR':
            return {...state, status: "CREATE_DATASET_WITH_IMAGES_ERROR", error: action.error}
        case 'DELETE_DATASET':
            return {...state, status: "DELETING_DATASET"}
        case 'DELETE_DATASET_SUCCESS':
            return {...state, 
                    status: "DELETING_DATASET_SUCCESS", 
                    datasets: state.datasets.filter(dataset => dataset._id !== action.id)
                }
        default:
            return state;
    }
}

export default datasetsReducer;