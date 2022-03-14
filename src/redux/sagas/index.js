import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import historyRotationSaga from './history-rotation';
import listWalletSaga from './list-wallet';

const rootSaga = function* root() {
  yield all([fork(authSaga), fork(userSaga), fork(historyRotationSaga), fork(listWalletSaga)]);
};

export default rootSaga;
