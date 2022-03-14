import { all, call, put, takeLatest } from 'redux-saga/effects';

import UserInstance from '@/services/api/user';
import AuthHelpers from '@/services/auth-helpers';
import { createUserAction, deleteUserAction, getAllUsersAction, updateUserAction } from '@/redux/actions';

export function* getAllUsersSaga(action) {
  try {
    const { params, cb } = action.payload;
    const response = yield call(UserInstance.getAll, params);

    yield put(getAllUsersAction.success(response));
    cb?.();
  } catch (err) {
    yield put(getAllUsersAction.failure(err));
  }
}

export function* createUserSaga(action) {
  try {
    const { body, cb } = action.payload;
    const response = yield call(UserInstance.create, body);

    yield put(createUserAction.success(response));
    cb?.();
  } catch (err) {
    yield put(createUserAction.failure(err));
  }
}

export function* updateUserSaga(action) {
  try {
    const { id, body, cb } = action.payload;
    const response = yield call(UserInstance.update, id, body);

    yield put(updateUserAction.success(response));
    cb?.();
  } catch (err) {
    yield put(updateUserAction.failure(err));
  }
}

export function* deleteUserSaga(action) {
  try {
    const { id, user_code, cb } = action.payload;
    const response = yield call(UserInstance.delete, id, user_code);

    yield put(deleteUserAction.success(response));
    cb?.();
  } catch (err) {
    yield put(deleteUserAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(getAllUsersAction.request.type, getAllUsersSaga)]);
  yield all([takeLatest(createUserAction.request.type, createUserSaga)]);
  yield all([takeLatest(updateUserAction.request.type, updateUserSaga)]);
  yield all([takeLatest(deleteUserAction.request.type, deleteUserSaga)]);
}
