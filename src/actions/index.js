export const REGISTER = 'REGISTER';
export const RESET_REDIRECT = 'RESET_REDIRECT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const resetRedirect = () => {
  return {
    type: RESET_REDIRECT
  };
};

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
            payload: true
          });
        }
        return;
      })
      .catch(err => {
        return dispatch({
          type: REGISTER,
          payload: false
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
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: LOGIN,
            payload: user.username
          });
        }
      })
      .catch(err => {
        console.log(err);
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
        return;
        // add Error handling here for
        // unsuccessful logout
      })
      .catch(err => {
        console.log(err);
      });
  };
};
