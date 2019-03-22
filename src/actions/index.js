/** Actions */
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_ENTRIES = 'LOAD ENTIRES';
export const LOAD_ENTRY = 'LOAD_ENTRY';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';
export const EDIT_HOMEPAGE = 'EDIT_HOMEPAGE';

/** Action Creators*/

export const generateEntries = entry => {
  console.log(entry, 2);
  return () => {
    return fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      })
      .catch(err => console.log(err));
  };
};


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
        localStorage.removeItem('setHomePage')
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
        return dispatch({
          type: EDIT_EMAIL,
          payload: email
        })
      })
  }
}

export const editPassword = (oldPassword, editedPassword) => {
  return (dispatch) => {
    return fetch(`/api/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: oldPassword.password,
        newPassword: editedPassword.password
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((password) => {
        return dispatch({
          type: EDIT_PASSWORD,
          payload: password
        })
      })
  }
}

export const editHomepage = (page) => {
  return (dispatch) => {
    return fetch(`/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ homepage: page })
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((page) => {
        localStorage.setItem('setHomePage', page.result.homepage)
        return dispatch({
          type: EDIT_HOMEPAGE,
          payload: page
        })
      })
  }
}