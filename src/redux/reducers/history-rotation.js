import { createReducer } from 'deox';

import { getListHistoryRotationAction } from '@/redux/actions';

const initialState = {
  historyRotation: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getListHistoryRotationAction.success, (state, action) => {
    const { response } = action.payload;
    return { ...state, historyRotation: response };
  }),
]);

export default reducer;
