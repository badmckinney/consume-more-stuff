// import actions here
import { REGISTER, LOGIN, LOGOUT, RESET_REDIRECT,  ADD_POST } from '../actions';

const initialState = {
  items: [],
  currentUser: localStorage.getItem('user'),
  redirect: false
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      if (action.success) {
        return Object.assign({}, state, {
          redirect: true
        });
      } else {
        return state;
        //add error handling
      }
    case LOGIN:
      if (action.success) {
        localStorage.setItem('user', action.payload);
        return Object.assign({}, state, {
          currentUser: action.payload,
          redirect: true
        });
      } else {
        return state;
        //error handling
      }
    case LOGOUT:
      if (action.success) {
        localStorage.removeItem('user');
        return Object.assign({}, state, {
          currentUser: ''
        });
      } else {
        return state;
        //error handling
      }
    case RESET_REDIRECT:
      return Object.assign({}, state, {
        redirect: false
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
