// import actions here
import { LOGOUT, ADD_POST } from '../actions';

const initialState = {
  items: [],
  currentUser: ''
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, {
        currentUser: ''
      });
    case ADD_POST:
      return Object.assign({}, state, {
        items: [...state.items.action.payload]
      });
    default:
      return state;
  }
};

export default itemReducer;
