/** Actions */
export const LOAD_ENTRIES = 'LOAD ENTIRES';
export const FETCHED_DATA = 'FETCHED_DATA';

/** Action Creators*/
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
