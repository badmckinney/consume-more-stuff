// import actions here
import {
  LOGIN,
  LOGOUT,
  RESET_REDIRECT,
  FETCH_ITEMS,
  RESET_REDIRECT_ID
} from '../actions';

const initialState = {
  items: [],
  currentUser: localStorage.getItem('user'),
  redirect: false,
  redirectId: null
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
    case RESET_REDIRECT:
      return Object.assign({}, state, {
        redirect: false
      });
    case RESET_REDIRECT_ID:
      return Object.assign({}, state, {
        redirectId: null
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
