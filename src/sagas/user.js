import { call, put } from "redux-saga/effects";
import User from "../api/User";

export function* verifyToken(action) {
    try {
        const res =  yield call(User.verifyToken, action.token);
        console.log(res);
        yield put({type: "VERIFY_TOKEN_SUCCESS", token: action.token, userId: res.data.userId})
    } catch (e) {
        console.log(e);
        yield put({type: "VERIFY_TOKEN_FAILED"})
    }
}

export function* logIn(action) {
    try {
        const res = yield call(User.login, action.logInCred);
        console.log(res);
        yield put({type: "LOGIN_SUCCESS", token: res.data.token});
    } catch(e) {
        yield put({type: "LOGIN_FAILED", error: e.response.data.message});
    }
}

export function* signUp(action) {
    try {
        const res = yield call(User.signUp, action.signUpCred);
        console.log(res);
        yield put({type: "SIGNUP_SUCCESS", user: res.data});
    } catch (e) {
        yield put({type: "SIGNUP_FAILED", error: e.message});
    }
}