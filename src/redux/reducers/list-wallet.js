import { createReducer } from 'deox';

import { getListWalletAction } from '@/redux/actions';

const initialState = {
  listWallet: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getListWalletAction.success, (state, action) => {
    const { response } = action.payload;
    return { ...state, listWallet: response };
  }),
]);

export default reducer;
