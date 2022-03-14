import { all, call, put, takeLatest } from 'redux-saga/effects';

import HistoryRotationInstance from '@/services/api/history-rotation';
import { getListHistoryRotationAction } from '@/redux/actions';

export function* getListHistoryRotationSaga(action) {
  try {
    const { params, cb } = action.payload;
    const response = yield call(HistoryRotationInstance.getList, params);

    yield put(getListHistoryRotationAction.success(response));
    cb?.();
  } catch (err) {
    yield put(getListHistoryRotationAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(getListHistoryRotationAction.request.type, getListHistoryRotationSaga)]);
}
