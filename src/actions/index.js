export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = user => {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: LOGIN,
            payload: user.username
          });
        }

        //error handling for unsuccessful login
      });
  };
};

export const logout = () => {
  return dispatch => {
    return fetch('api/logout', { method: 'POST' })
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
