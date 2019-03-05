export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM';
export const FETCHED_SEARCH = 'FETCHED_SEARCH';
export const LOAD_TOP = 'LOAD_TOP';
export const EDIT_ITEM = 'EDIT_ITEM';

export const register = newUser => {
  return () => {
    return fetch('/api/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Error creating account');
        }

        return true;
      })
      .catch(err => false);
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
        if (res.status) return res.json();
      })
      .then(res => {
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
  return () => {
    return fetch('/api/items/new', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error creating new post');
        }

        return res.json();
      })
      .then(res => res.id)
      .catch(err => false);
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
        if (res.status !== 200) {
          throw new Error('error fetching item');
        }

        return res.json();
      })
      .then(res => {
        dispatch({
          type: LOAD_SINGLE_ITEM,
          payload: res.item
        });

        return true;
      })
      .catch(err => false);
  };
};

export const searchItems = term => {
  return dispatch => {
    return fetch(`/api/items/search/${term}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error fetching search results');
        }

        return res.json();
      })
      .then(res => {
        dispatch({
          type: FETCHED_SEARCH,
          payload: res.items
        });

        return true;
      })
      .catch(err => false);
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

export const editItem = item => {
  return () => {
    return fetch(`/api/items/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('error editing item');
        }

        return true;
      })
      .catch(err => false);
  };
};
