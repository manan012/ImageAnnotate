import { call } from "ramda";
import PROJECT from "../api/Project";
import { put } from "redux-saga/effects";

export function* fetchProjects(action) {
    try {
        const res = yield call(PROJECT.getProjects);
        console.log(res);
        yield put({type: 'FETCH_PROJECTS_SUCCESS', projects: [...res.data.projects.projectsCreated, ...res.data.projects.projectsInvited]})
    } catch (e) {
        yield put({type: 'FETCH_PROJECTS_FAILED', error: e.message});
    }
};

export function* fetchProject(action) {
    console.log(action);
}