import {call, put} from 'redux-saga/effects';
import DATASET from '../api/Dataset';

export function* fetchDatasets() {
    try {
        const res = yield call(DATASET.fetchDatasets);
        yield put({type: "FETCH_DATASETS_SUCCESS", datasets: res.data.datasets});
    } catch (e) {
        yield put({type: "FETCH_DATASET_FAILED", error: e.response.data.message});
    }
}

export function* fetchDataset(action) {
    try {
        const res = yield call(DATASET.fetchDataset, action.id);
        yield put({type: 'FETCH_DATASET_SUCCESS', dataset: res.data.dataset});
    } catch (e) {
        yield put({type: 'FETCH_DATASET_SUCCESS', error: e.response.data.message});
    }
}

export function* createDatasetWithImages(action) {
    try {
        const res = yield call(DATASET.createDatasetWithImages, action.images, action.name);
        console.dir(res);
        yield put({type: 'CREATE_DATASET_WITH_IMAGES_SUCCESS', dataset: res.data.dataset});
    } catch (e) {
        console.dir(e);
        yield put({type: "CREATE_DATASET_WITH_IMAGES_FAILED", error: e.response.data.message});
    }
} 

export function* deleteDataset(action) {
    try {
        const res = yield call(DATASET.deleteDataset, action.id);
        yield put({type: 'DELETE_DATASET_SUCCESS', id:action.id})
    } catch(e) {
        yield put({type: 'DELETE_DATASET_FAILED', error: e.response.data.message})
    }
}

export function* deleteImages(action) {
    try {
        const res = yield call(DATASET.deleteImages, action.datasetId, action.imagesIds);
        yield put({type: 'DELETE_IMAGES_SUCCESS', imageIds: action.imagesIds});
    } catch(e) {
        yield put({type: 'DELETE_IMAGES_FAILED', error: e.response.data.error})
    }
}

export function* uploadImages(action) {
    try {
        const res = yield call(DATASET.uploadImages, action.datasetId, action.images);
        yield put({type: 'UPLOAD_IMAGES_SUCCESS', uploadedImages: res.data.uploaded_images});
    } catch(e) {
        yield put({type: 'UPLOAD_IMAGES_FAILED', error: e.response.data.message})
    }
}


    