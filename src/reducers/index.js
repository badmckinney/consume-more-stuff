// import actions here
import { LOGOUT, FETCH_ITEMS } from '../actions';

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
    case FETCH_ITEMS:
      return Object.assign({}, state, { items: action.payload });
    default:
      return state;
  }
};

export default itemReducer;
