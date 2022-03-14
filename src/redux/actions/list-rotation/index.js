import { createActionCreator } from 'deox';
import { EListRotationAction } from './constants';

export const getListRotationAction = {
  request: createActionCreator(
    EListRotationAction.GET_LIST_ROTATION_REQUEST,
    (resolve) => (params, cb) => resolve({ params, cb }),
  ),
  success: createActionCreator(
    EListRotationAction.GET_LIST_ROTATION_SUCCESS,
    (resolve) => (response) => resolve({ response }),
  ),
  failure: createActionCreator(
    EListRotationAction.GET_LIST_ROTATION_FAILED,
    (resolve) => (error) => resolve({ error }),
  ),
};

export const updateRotationAction = {
  request: createActionCreator(
    EListRotationAction.UPDATE_ROTATION_REQUEST,
    (resolve) => (body, cb) => resolve({ body, cb }),
  ),
  success: createActionCreator(
    EListRotationAction.UPDATE_ROTATION_SUCCESS,
    (resolve) => (response) => resolve({ response }),
  ),
  failure: createActionCreator(EListRotationAction.UPDATE_ROTATION_FAILED, (resolve) => (error) => resolve({ error })),
};
