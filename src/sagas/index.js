import {takeLatest, takeEvery} from 'redux-saga/effects'
import { fetchProjects, fetchProject } from './projectSagas'
import { verifyToken, logIn, signUp } from './user';

export default function* rootSaga() {
    //User actions
    yield takeEvery('VERIFY_TOKEN', verifyToken);
    yield takeLatest('LOGIN', logIn),
    yield takeLatest('SIGNUP', signUp),

    //Project actions
    yield takeLatest('FETCH_PROJECTS', fetchProjects);
    yield takeLatest('FETCH_PROJECT', fetchProject);
}