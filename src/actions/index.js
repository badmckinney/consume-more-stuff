export const LOGOUT = 'LOGOUT';
export const ADD_POST = 'ADDPOST';

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

export const addPost = newPost => {
  return dispatch => {
    return fetch('api/items/new', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        return dispatch({
          type: ADD_POST,
          payload: newPost
        }).catch(err => {
          res.status(500).json(err);
        });
      });
  };
};
