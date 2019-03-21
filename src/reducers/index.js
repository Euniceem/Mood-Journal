import { LOAD_ENTRIES, LOAD_ENTRY, LOGIN_USER, LOGOUT_USER, EDIT_EMAIL, EDIT_HOMEPAGE } from '../actions';

const initialState = {
  entries: [],
  entry: [],
  email: localStorage.getItem('email'),
  loggedIn: localStorage.getItem('loggedIn'),
  setHomePage: localStorage.getItem('setHomePage')
};

const moodJournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true, email: action.payload.email });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, email: '' });
    case EDIT_EMAIL:
      return Object.assign({}, state, { email: action.payload });
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    case LOAD_ENTRY:
      return Object.assign({}, state, { entry: action.payload });
    case EDIT_HOMEPAGE:
      return Object.assign({}, state, { setHomePage: action.payload.result.homepage });
    default:
      return state;
  }
};

export default moodJournalReducer;
