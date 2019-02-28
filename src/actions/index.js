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
        return res.json();
      })
      .then(res => {
        if (res.success) {
          return dispatch({
            type: LOGIN,
            success: true,
            payload: user.username
          });
        }

        return dispatch({
          type: LOGIN,
          success: false
        });
      })
      .catch(err => {
        return dispatch({
          type: LOGIN,
          success: false
        });
      });
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
