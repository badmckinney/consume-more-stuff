export const LOGOUT = 'LOGOUT';
export const FETCH_ITEMS = 'FETCH_ITEMS';

export const logout = () => {
  return dispatch => {
    return fetch('/logout', { method: 'POST' })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: LOGOUT
          });
        }

        // add Error handling here for
        // unsuccessful logout
      });
  };
};

export const fetchItems = (category) => {
  return dispatch => {
    console.log('action', category);
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
  }
};
