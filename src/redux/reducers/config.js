import { createReducer } from 'deox';

import { getConfigAction } from '@/redux/actions';

const initialState = {
  config: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getConfigAction.success, (state, action) => {
    const { response } = action.payload;
    return { ...state, config: response };
  }),
]);

export default reducer;
