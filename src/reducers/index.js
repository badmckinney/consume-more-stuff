// import actions here
import { REGISTER, LOGIN, LOGOUT, RESET_REDIRECT } from '../actions';

const initialState = {
  items: [],
  currentUser: '',
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
        return;
        //add error handling
      }
    case LOGIN:
      if (action.success) {
        return Object.assign({}, state, {
          currentUser: action.payload,
          redirect: true
        });
      } else {
        return;
        //error handling
      }
    case LOGOUT:
      if (action.success) {
        return Object.assign({}, state, {
          currentUser: ''
        });
      } else {
        return;
        //error handling
      }
    case RESET_REDIRECT:
      return Object.assign({}, state, {
        redirect: false
      });
    default:
      return state;
  }
};

export default itemReducer;
