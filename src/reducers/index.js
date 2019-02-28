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
      if (action.payload) {
        return Object.assign({}, state, {
          redirect: true
        });
      }
      return;
    case LOGIN:
      return Object.assign({}, state, {
        currentUser: action.payload,
        redirect: true
      });
    case LOGOUT:
      return Object.assign({}, state, {
        currentUser: ''
      });
    case RESET_REDIRECT:
      return Object.assign({}, state, {
        redirect: false
      });
    default:
      return state;
  }
};

export default itemReducer;
