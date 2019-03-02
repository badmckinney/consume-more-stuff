export const RESET_REDIRECT = 'RESET_REDIRECT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESET_REDIRECT_ID = 'RESET_REDIRECT_ID';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM';

export const resetRedirect = () => {
  return {
    type: RESET_REDIRECT
  };
};

export const resetRedirectId = () => {
  return {
    type: RESET_REDIRECT_ID
  };
};

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
