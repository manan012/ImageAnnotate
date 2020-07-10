import { call } from "ramda";
import PROJECT from "../api/Project";
import { put } from "redux-saga/effects";

export function* fetchProjects(action) {
    try {
        const res = yield call(PROJECT.getProjects);
        console.log(res);
        yield put({type: 'FETCH_PROJECTS_SUCCESS', projects: [...res.data.projects.projectsCreated, ...res.data.projects.projectsInvited]})
    } catch (e) {
        yield put({type: 'FETCH_PROJECTS_FAILED', error: e.response.data.message});
    }
};


export function* fetchProject(action) {
    try {
        const res = yield call(PROJECT.getProject, action.projectId);
        console.log(res);
        yield put({type: 'FETCH_PROJECT_SUCCESS', project: res.data.project});
    } catch (e) {
        yield put({type: 'FETCH_PROJECT_FAILED', error: e.response.data.message});
    }
}

export function* addProject(action) {
    try {
        const res = yield call(PROJECT.addProject, action.name, action.description, action.datasetIds);
        console.log(res)
        yield put({type: 'ADD_PROJECT_SUCCESS', project: res.data.project});
    } catch (e) {
        yield put({type: 'ADD_PROJECT_FAILED', error: e.response.data.message})
    }
}

export function* deleteProject(action) {
    try {
        const res = yield call(PROJECT.deleteProject, action.id);
        console.log(res);
        yield put({type: 'DELETE_PROJECT_SUCCESS', id: action.id});
    } catch(e) {
        yield put({type: 'DELETE_PROJECT_FAILED', error: e.response.data.message});
    }
}