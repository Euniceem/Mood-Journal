/** Actions */
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_ENTRIES = 'LOAD ENTIRES';
export const LOAD_ENTRY = 'LOAD_ENTRY';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';

/** Action Creators*/
export const register = (email) => {
  return (dispatch) => {
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(email => {
        return dispatch({
          type: REGISTER_USER,
          payload: email
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const login = email => {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(email => {
        localStorage.setItem('email', email.email);
        localStorage.setItem('loggedIn', true);
        return dispatch({
          type: LOGIN_USER,
          payload: email
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
      .then(email => {
        localStorage.removeItem('email');
        localStorage.removeItem('loggedIn');
        return dispatch({
          type: LOGOUT_USER,
          payload: email
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

export const loadEntry = (id) => {
  return dispatch => {
    return fetch(`/api/entries/${id}`, {})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(entry => {
        return dispatch({
          type: LOAD_ENTRY,
          payload: entry
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editEmail = (editedEmail) => {
  console.log('editedEmail', editedEmail)
  return (dispatch) => {
    return fetch(`/api/profile/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedEmail)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((email) => {
        console.log('action email', email)
        return dispatch({
          type: EDIT_EMAIL,
          payload: email
        })
      })
  }
}

export const editPassword = (editedPassword) => {
  console.log('editedPassword', editedPassword)
  return (dispatch) => {
    return fetch(`/api/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedPassword)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((password) => {
        console.log('action email', password)
        return dispatch({
          type: EDIT_PASSWORD,
          payload: password
        })
      })
  }
}

