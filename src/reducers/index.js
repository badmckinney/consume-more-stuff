// import actions here
import { LOGIN, LOGOUT, FETCH_ITEMS } from '../actions';

const initialState = {
  items: [],
  currentUser: localStorage.getItem('user')
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('user', action.payload);
      return Object.assign({}, state, {
        currentUser: action.payload
      });
    case LOGOUT:
      localStorage.removeItem('user');
      return Object.assign({}, state, {
        currentUser: ''
      });
    case FETCH_ITEMS:
      return Object.assign({}, state, { items: action.payload });
    // case LOAD_SINGLE_ITEM:
    //   return Object.assign({}, state, { items: action.payload });
    default:
      return state;
  }
};

export default itemReducer;
