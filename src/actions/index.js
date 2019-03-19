/** Actions */
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_ENTRIES = 'LOAD ENTIRES';
export const FETCHED_DATA = 'FETCHED_DATA';

/** Action Creators*/
export const register = (user) => {
  return (dispatch) => {
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(user => {
        return dispatch({
          type: REGISTER_USER,
          payload: user
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const login = user => {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(user => {
        localStorage.setItem('email', user.email);
        localStorage.setItem('loggedIn', true);
        return dispatch({
          type: LOGIN_USER,
          payload: user
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logout = () => {
  return dispatch => {
    return fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(user => {
        localStorage.removeItem('email');
        localStorage.removeItem('loggedIn');
        return dispatch({
          type: LOGOUT_USER,
          payload: user
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const loadEntries = () => {
  return dispatch => {
    return fetch(`/api/entries/`, {})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(entries => {
        return dispatch({
          type: LOAD_ENTRIES,
          payload: entries
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchData = () => {
  return dispatch => {
    return fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        return dispatch({
          type: FETCHED_DATA,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
