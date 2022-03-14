import { createActionCreator } from 'deox';
import { EListWalletAction } from './constants';

export const getListWalletAction = {
  request: createActionCreator(
    EListWalletAction.GET_LIST_WALLET_REQUEST,
    (resolve) => (params, cb) => resolve({ params, cb }),
  ),
  success: createActionCreator(
    EListWalletAction.GET_LIST_WALLET_SUCCESS,
    (resolve) => (response) => resolve({ response }),
  ),
  failure: createActionCreator(EListWalletAction.GET_LIST_WALLET_FAILED, (resolve) => (error) => resolve({ error })),
};
