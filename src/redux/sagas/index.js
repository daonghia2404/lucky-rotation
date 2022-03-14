import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import userSaga from './user';
import historyRotationSaga from './history-rotation';
import listWalletSaga from './list-wallet';
import listRotationSaga from './list-rotation';
import configSaga from './config';

const rootSaga = function* root() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(historyRotationSaga),
    fork(listWalletSaga),
    fork(configSaga),
    fork(listRotationSaga),
  ]);
};

export default rootSaga;
