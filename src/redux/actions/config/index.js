import { createActionCreator } from 'deox';
import { EConfigAction } from './constants';

export const getConfigAction = {
  request: createActionCreator(EConfigAction.GET_CONFIG_REQUEST, (resolve) => (params, cb) => resolve({ params, cb })),
  success: createActionCreator(EConfigAction.GET_CONFIG_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EConfigAction.GET_CONFIG_FAILED, (resolve) => (error) => resolve({ error })),
};

export const updateConfigAction = {
  request: createActionCreator(EConfigAction.UPDATE_CONFIG_REQUEST, (resolve) => (body, cb) => resolve({ body, cb })),
  success: createActionCreator(EConfigAction.UPDATE_CONFIG_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EConfigAction.UPDATE_CONFIG_FAILED, (resolve) => (error) => resolve({ error })),
};
