import { createActionCreator } from 'deox';
import { EHistoryRotationAction } from './constants';

export const getListHistoryRotationAction = {
  request: createActionCreator(
    EHistoryRotationAction.GET_LIST_HISTORY_ROTATION_REQUEST,
    (resolve) => (params, cb) => resolve({ params, cb }),
  ),
  success: createActionCreator(
    EHistoryRotationAction.GET_LIST_HISTORY_ROTATION_SUCCESS,
    (resolve) => (response) => resolve({ response }),
  ),
  failure: createActionCreator(
    EHistoryRotationAction.GET_LIST_HISTORY_ROTATION_FAILED,
    (resolve) => (error) => resolve({ error }),
  ),
};
