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
        case 'FETCH_DATASETS_FAILED':
            return {...state, status: 'FETCH_DATASETS_FAILED', error: action.error}
        case 'CREATE_DATASET_WITH_IMAGES':
            return {...state, status: 'CREATING_DATASET_WITH_IMAGES'}
        case 'CREATE_DATASET_WITH_IMAGES_SUCCESS':
            return {...state, status: 'CREATE_DATASET_WITH_IMAGE_SUCCESS', datasets: [action.dataset, ...state.datasets]}
        case 'CREATE_DATASET_WITH_IMAGES_FAILED':
            return {...state, status: "CREATE_DATASET_WITH_IMAGES_FAILED", error: action.error}
        case 'UPLOAD_IMAGES':
            return {...state, dataset: {...state.dataset, status: 'UPLOADING_IMAGES'}}
        case 'UPLOAD_IMAGES_SUCCESS':
            return {...state, dataset: {...state.dataset, status: 'UPLOAD_IMAGES_SUCCESS', images: [...action.uploadedImages, ...state.dataset.images]}}
        case 'UPLOAD_IMAGES_FAILED':
            return {...state, dataset: {...state.dataset, status: 'UPLOAD_IMAGES_SUCCESS', error: action.error}}
        case 'DELETE_DATASET':
            return {...state, status: "DELETING_DATASET"}
        case 'DELETE_IMAGES':
            return {...state, dataset: {...state.dataset, status: 'DELETING_IMAGES'}}
        case 'DELETE_IMAGES_SUCCESS':
            return {...state, 
                        dataset: {...state.dataset, 
                        status: 'DELETE_IMAGE_SUCCESS', 
                        images: state.dataset.images.filter(img => action.imageIds.filter(id => id === img._id).length === 0)
                    }
                }
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