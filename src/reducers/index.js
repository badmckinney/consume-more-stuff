// import actions here
import { LOGIN, LOGOUT } from '../actions';

const initialState = {
  items: [],
  currentUser: ''
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        currentUser: action.payload
      });
    case LOGOUT:
      return Object.assign({}, state, {
        currentUser: ''
      });
    default:
      return state;
  }
};

export default itemReducer;
