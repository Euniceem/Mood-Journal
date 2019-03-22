/** Actions */
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_ENTRIES = 'LOAD ENTIRES';
export const LOAD_EMOTIONS = 'LOAD_EMOTIONS';
export const LOAD_ACTIVITIES = 'LOAD_ACTIVITIES';
export const LOAD_ENTRY = 'LOAD_ENTRY';
export const EDIT_EMAIL = 'EDIT_EMAIL';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';
export const EDIT_HOMEPAGE = 'EDIT_HOMEPAGE';
export const ADD_PRESET = 'ADD_PRESET';
export const SUBMIT_ENTRY = 'SUBMIT_ENTRY';
export const FETCHED_DATA = 'FETCHED_DATA';

const proxy = 'https://api.moodcatcher.com';

/** Action Creators*/

export const register = email => {
  return dispatch => {
    return fetch(`${proxy}/api/register`, {
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
    return fetch(`${proxy}/api/login`, {
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
    return fetch(`${proxy}/api/logout`, {
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
        localStorage.removeItem('setHomePage');
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
    return fetch(`${proxy}/api/entries/`, {})
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

export const loadEntry = id => {
  return dispatch => {
    return fetch(`${proxy}/api/entries/${id}`, {})
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

export const loadEmotions = () => {
  return dispatch => {
    return fetch(`${proxy}/api/emotions`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(emotions => {
        return dispatch({
          type: LOAD_EMOTIONS,
          payload: emotions
        });
      });
  };
};

export const fetchData = () => {
  return dispatch => {
    return fetch(`${proxy}/api/data`)
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

export const editEmail = editedEmail => {
  return dispatch => {
    return fetch(`${proxy}/api/profile/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedEmail)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(email => {
        return dispatch({
          type: EDIT_EMAIL,
          payload: email
        });
      });
  };
};

export const editPassword = (oldPassword, editedPassword) => {
  return dispatch => {
    return fetch(`${proxy}/api/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: oldPassword.password,
        newPassword: editedPassword.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(password => {
        return dispatch({
          type: EDIT_PASSWORD,
          payload: password
        });
      });
  };
};

export const editHomepage = page => {
  return dispatch => {
    return fetch(`${proxy}/api/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ homepage: page })
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(page => {
        localStorage.setItem('setHomePage', page.result.homepage);
        return dispatch({
          type: EDIT_HOMEPAGE,
          payload: page
        });
      });
  };
};

export const loadActivities = () => {
  return dispatch => {
    fetch(`${proxy}/api/activities`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(body => {
        return dispatch({
          type: LOAD_ACTIVITIES,
          payload: body
        });
      });
  };
};

export const addPreset = (presetObj, route) => {
  return dispatch => {
    return fetch(route, {
      method: 'POST',
      body: JSON.stringify(presetObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(body => {
        return dispatch({
          type: ADD_PRESET,
          payload: body
        });
      });
  };
};

export const submitEntry = data => {
  return dispatch => {
    return fetch(`${proxy}/api/entries`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return dispatch({
        type: SUBMIT_ENTRY,
        payload: 'success: true'
      });
    });
  };
};
