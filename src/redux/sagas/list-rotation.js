import { all, call, put, takeLatest } from 'redux-saga/effects';

import ListRotationInstance from '@/services/api/list-rotation';
import { getListRotationAction, updateRotationAction } from '@/redux/actions';

export function* getListRotationSaga(action) {
  try {
    const { params, cb } = action.payload;
    const response = yield call(ListRotationInstance.getList, params);

    yield put(getListRotationAction.success(response));
    cb?.();
  } catch (err) {
    yield put(getListRotationAction.failure(err));
  }
}

export function* updateRotationSaga(action) {
  try {
    const { body, cb } = action.payload;
    const response = yield call(ListRotationInstance.update, body);

    yield put(updateRotationAction.success(response));
    cb?.();
  } catch (err) {
    yield put(updateRotationAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(getListRotationAction.request.type, getListRotationSaga)]);
  yield all([takeLatest(updateRotationAction.request.type, updateRotationSaga)]);
}
