import { combineReducers } from 'redux';

import loading from './status/loading';
import success from './status/success';
import error from './status/error';
import authState from './auth';
import userState from './user';
import historyRotationState from './history-rotation';
import configState from './config';
import listWalletState from './list-wallet';
import listRotationState from './list-rotation';

const rootReducer = combineReducers({
  loading,
  success,
  error,
  authState,
  userState,
  historyRotationState,
  listWalletState,
  listRotationState,
  configState,
});

export default rootReducer;
