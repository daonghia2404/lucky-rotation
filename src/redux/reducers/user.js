import { createReducer } from 'deox';

import { getAllUsersAction } from '@/redux/actions';

const initialState = {
  users: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getAllUsersAction.success, (state, action) => {
    const { response } = action.payload;
    return { ...state, users: response };
  }),
]);

export default reducer;
