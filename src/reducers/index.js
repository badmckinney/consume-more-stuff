// import actions here
import {
  LOGIN,
  LOGOUT,
  FETCH_ITEMS,
  LOAD_SINGLE_ITEM,
  LOAD_TOP,
  FETCHED_SEARCH
} from '../actions';

const initialState = {
  items: [],
  currentUser: localStorage.getItem('user'),
  searchResults: [],
  topTen: {}
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
    case FETCHED_SEARCH:
      return Object.assign({}, state, {
        searchResults: action.payload
      });
    case LOAD_SINGLE_ITEM:
      return Object.assign({}, state, { items: action.payload });
    case LOAD_TOP:
      const category = action.payload.category;
      return Object.assign({}, state, {
        topTen: Object.assign({}, state.topTen, {
          [category]: action.payload.items
        })
      });
    default:
      return state;
  }
};

export default itemReducer;
