import { all, call, put, takeLatest } from 'redux-saga/effects';

import ListWalletInstance from '@/services/api/list-wallet';
import { getListWalletAction } from '@/redux/actions';

export function* getListWalletSaga(action) {
  try {
    const { params, cb } = action.payload;
    const response = yield call(ListWalletInstance.getList, params);

    yield put(getListWalletAction.success(response));
    cb?.();
  } catch (err) {
    yield put(getListWalletAction.failure(err));
  }
}

export default function* root() {
  yield all([takeLatest(getListWalletAction.request.type, getListWalletSaga)]);
}
