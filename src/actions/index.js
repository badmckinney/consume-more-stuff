export const LOGOUT = 'LOGOUT';

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
