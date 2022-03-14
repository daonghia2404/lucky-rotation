import { all, call, put, takeLatest } from 'redux-saga/effects';

import ConfigInstance from '@/services/api/config';
import { getConfigAction, updateConfigAction } from '@/redux/actions';

export function* getConfigSaga(action) {
  try {
    const { params, cb } = action.payload;
    const response = yield call(ConfigInstance.getConfig, params);

    yield put(getConfigAction.success(response));
    cb?.();
  } catch (err) {
    yield put(getConfigAction.failure(err));
  }
}

export function* updateConfigSaga(action) {
  try {
    const { body, cb } = action.payload;
    const response = yield call(ConfigInstance.updateConfig, body);

    yield put(updateConfigAction.success(response));
    cb?.();
  } catch (err) {
    yield put(updateConfigAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(getConfigAction.request.type, getConfigSaga)]);
  yield all([takeLatest(updateConfigAction.request.type, updateConfigSaga)]);
}
