import { resolveSoa } from 'dns';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM';
export const FETCHED_SEARCH = 'FETCHED_SEARCH';
export const ERROR = 'ERROR';

export const login = username => {
  return {
    type: LOGIN,
    payload: username
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

//should probably name this differently, as it's specific to loading items/category not just items
export const fetchItems = category => {
  return dispatch => {
    return fetch(`/api/items/category/${category}`)
      .then(res => {
        return res.json();
      })
      .then(items => {
        return dispatch({
          type: FETCH_ITEMS,
          payload: items
        });
      });
  };
};

export const loadSingleItem = id => {
  return dispatch => {
    return fetch(`api/items/${id}`)
      .then(res => {
        return res.json();
      })
      .then(item => {
        return dispatch({
          type: LOAD_SINGLE_ITEM,
          payload: item
        });
      });
  };
};

export const searchItems = searchTerm => {
  return dispatch => {
    return fetch(`/api/items/search/${searchTerm}`, {
      method: 'POST',
      body: JSON.stringify(searchTerm),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (!res.items) {
          throw new Error('No results found.');
        }

        return dispatch({
          type: FETCHED_SEARCH,
          payload: res.items
        });
      })
      .catch(err => {
        dispatch({ type: ERROR });
      });
  };
};
