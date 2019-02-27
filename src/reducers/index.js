// import actions here
import { LOGOUT } from '../actions';

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
    default:
      return state;
  }
};

export default itemReducer;
