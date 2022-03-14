import { createReducer } from 'deox';

import { getListRotationAction } from '@/redux/actions';

const initialState = {
  listRotation: undefined,
};

const reducer = createReducer(initialState, (handleAction) => [
  handleAction(getListRotationAction.success, (state, action) => {
    const { response } = action.payload;
    return { ...state, listRotation: response };
  }),
]);

export default reducer;
