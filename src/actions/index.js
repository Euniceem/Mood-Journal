/** Actions */
export const LOAD_ENTRIES = 'LOAD ENTIRES';

/** Action Creators*/
export const loadEntries = () => {
  return (dispatch) => {
    return fetch(`/api/entries/`, {
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((entry) => {
        console.log(entry)
        return dispatch({
          type: LOAD_ENTRIES,
          payload: entry
        });
      });
  }
}