import { createActionCreator } from 'deox';
import { EAuthAction } from './constants';

export const loginAction = {
  request: createActionCreator(EAuthAction.LOGIN_REQUEST, (resolve) => (body, cb) => resolve({ body, cb })),
  success: createActionCreator(EAuthAction.LOGIN_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EAuthAction.LOGIN_FAILED, (resolve) => (error) => resolve({ error })),
};

export const logoutAction = {
  request: createActionCreator(EAuthAction.LOGOUT_REQUEST, (resolve) => (cb) => resolve({ cb })),
  success: createActionCreator(EAuthAction.LOGOUT_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EAuthAction.LOGOUT_FAILED, (resolve) => (error) => resolve({ error })),
};
