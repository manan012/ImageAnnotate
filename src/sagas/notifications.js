import NOTIFICATION from "../api/Notification";
import { put, call } from "redux-saga/effects";

export function* fetchNotification(action) {
    try {
       const res = yield call(NOTIFICATION.fetchNotifications);
        console.log(res);
       yield put({type: 'FETCH_NOTIFICATION_SUCCESS', notifications: res.data.notifications});
    } catch(e) {
        yield put({type: 'FETCH_NOTIFICATION_FAILED', error: e.response.data.message});
    }
}