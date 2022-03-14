import { combineReducers } from 'redux';

import loading from './status/loading';
import success from './status/success';
import error from './status/error';
import authState from './auth';
import userState from './user';
import historyRotationState from './history-rotation';
import configState from './config';
import listWalletState from './list-wallet';

const rootReducer = combineReducers({
  loading,
  success,
  error,
  authState,
  userState,
  historyRotationState,
  listWalletState,
  configState,
});

export default rootReducer;
