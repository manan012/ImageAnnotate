import {takeLatest, takeEvery} from 'redux-saga/effects'
import { fetchProjects, fetchProject, deleteProject, addProject, inviteCollaborator, acceptInvitation, rejectInvitation } from './projectSagas'
import { verifyToken, logIn, signUp } from './user';
import {fetchDatasets, createDatasetWithImages, fetchDataset, deleteDataset, uploadImages, deleteImages} from './datasetSagas'
import { fetchNotification } from './notifications';

export default function* rootSaga() {
    //User actions
    yield takeEvery('VERIFY_TOKEN', verifyToken);
    yield takeLatest('LOGIN', logIn),
    yield takeLatest('SIGNUP', signUp),

    //Project actions
    yield takeLatest('FETCH_PROJECTS', fetchProjects);
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeEvery('ADD_PROJECT', addProject);
    yield takeEvery('DELETE_PROJECT', deleteProject);
    yield takeEvery('INVITE_COLLABORATOR', inviteCollaborator);
    yield takeEvery('ACCEPT_INVITATION', acceptInvitation);
    yield takeEvery('REJECT_INVITATION', rejectInvitation);

    //Datasets actions
    yield takeLatest('FETCH_DATASET', fetchDataset);
    yield takeLatest('FETCH_DATASETS', fetchDatasets);
    yield takeLatest('CREATE_DATASET_WITH_IMAGES', createDatasetWithImages);
    yield takeEvery('DELETE_DATASET', deleteDataset);
    yield takeEvery("DELETE_IMAGES", deleteImages)
    yield takeEvery('UPLOAD_IMAGES', uploadImages);

    //Notification actions
    yield takeEvery('FETCH_NOTIFICATION', fetchNotification);
}