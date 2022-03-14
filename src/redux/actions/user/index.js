import { createActionCreator } from 'deox';
import { EUserAction } from './constants';

export const getAllUsersAction = {
  request: createActionCreator(EUserAction.GET_ALL_USERS_REQUEST, (resolve) => (params, cb) => resolve({ params, cb })),
  success: createActionCreator(EUserAction.GET_ALL_USERS_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EUserAction.GET_ALL_USERS_FAILED, (resolve) => (error) => resolve({ error })),
};

export const createUserAction = {
  request: createActionCreator(EUserAction.CREATE_USER_REQUEST, (resolve) => (body, cb) => resolve({ body, cb })),
  success: createActionCreator(EUserAction.CREATE_USER_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EUserAction.CREATE_USER_FAILED, (resolve) => (error) => resolve({ error })),
};

export const updateUserAction = {
  request: createActionCreator(
    EUserAction.UPDATE_USER_REQUEST,
    (resolve) => (id, body, cb) => resolve({ id, body, cb }),
  ),
  success: createActionCreator(EUserAction.UPDATE_USER_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EUserAction.UPDATE_USER_FAILED, (resolve) => (error) => resolve({ error })),
};

export const deleteUserAction = {
  request: createActionCreator(
    EUserAction.DELETE_USER_REQUEST,
    (resolve) => (id, user_code, cb) => resolve({ id, user_code, cb }),
  ),
  success: createActionCreator(EUserAction.DELETE_USER_SUCCESS, (resolve) => (response) => resolve({ response })),
  failure: createActionCreator(EUserAction.DELETE_USER_FAILED, (resolve) => (error) => resolve({ error })),
};
