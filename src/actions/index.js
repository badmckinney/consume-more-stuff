export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM';
export const FETCHED_SEARCH = 'FETCHED_SEARCH';
export const ERROR = 'ERROR';
export const LOAD_TOP = 'LOAD_TOP';

export const register = newUser => {
  return dispatch => {
    return fetch('/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: REGISTER,
            success: true
          });
        }
        return dispatch({
          type: REGISTER,
          success: false
        });
      })
      .catch(err => {
        return dispatch({
          type: REGISTER,
          success: false
        });
      });
  };
};

export const login = user => {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized');
        }

        return res.json();
      })
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: res.username
        });

        return true;
      })
      .catch(err => false);
  };
};

export const logout = () => {
  return dispatch => {
    return fetch('/api/logout', { method: 'POST' })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: LOGOUT,
            success: true
          });
        }

        return dispatch({
          type: LOGOUT,
          success: false
        });
      })
      .catch(err => {
        return dispatch({
          type: LOGOUT,
          success: false
        });
      });
  };
};

export const addItem = newItem => {
  return dispatch => {
    return fetch('/api/items/new', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: ADD_ITEM,
            success: true,
            payload: res.id
          });
        }

        return dispatch({
          type: ADD_ITEM,
          success: false
        });
      })
      .catch(err => {
        return dispatch({
          type: ADD_ITEM,
          success: false
        });
      });
  };
};

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
    return fetch(`/api/items/${id}`)
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

export const searchItems = term => {
  return dispatch => {
    return fetch(`/api/items/search/${term}`)
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: FETCHED_SEARCH,
          payload: res.items
        });
      })
      .catch(err => dispatch({ type: ERROR }));
  };
};

export const loadTop = category => {
  return dispatch => {
    return fetch(`/api/items/category/${category}/top`)
      .then(res => {
        return res.json();
      })
      .then(items => {
        return dispatch({
          type: LOAD_TOP,
          payload: { category: category, items: items }
        });
      });
  };
};
