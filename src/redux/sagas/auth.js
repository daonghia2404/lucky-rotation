import { all, call, put, takeLatest } from 'redux-saga/effects';

import AuthInstance from '@/services/api/auth';
import AuthHelpers from '@/services/auth-helpers';
import { loginAction, logoutAction } from '@/redux/actions';

export function* loginSaga(action) {
  try {
    const { body, cb } = action.payload;
    const response = yield call(AuthInstance.login, body);

    AuthHelpers.storeAccessToken(response.payload.token);
    AuthHelpers.storeRefreshToken(response.payload.refreshToken);

    yield put(loginAction.success(response));
    cb?.();
  } catch (err) {
    yield put(loginAction.failure(err));
  }
}

export function* logoutSaga(action) {
  try {
    const { cb } = action.payload;
    const response = yield call(AuthInstance.logout);

    yield put(logoutAction.success(response));
    cb?.();
  } catch (err) {
    yield put(logoutAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(loginAction.request.type, loginSaga)]);
  yield all([takeLatest(logoutAction.request.type, logoutSaga)]);
}
