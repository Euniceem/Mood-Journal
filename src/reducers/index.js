import { LOAD_ENTRIES, LOAD_EMOTIONS, LOAD_ACTIVITIES, LOGIN_USER, LOGOUT_USER, LOAD_ENTRY } from '../actions';

const initialState = {
  entries: [],
  entry: [],
  email: localStorage.getItem('email'),
  loggedIn: localStorage.getItem('loggedIn'),
};

const moodJournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loggedIn: true, email: action.payload.email });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, email: '' });
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    case LOAD_EMOTIONS:
      return Object.assign({}, state, { emotions: [...action.payload] });
    case LOAD_ACTIVITIES:
      return Object.assign({}, state, { activities: [...action.payload] });
    case LOAD_ENTRY:
      return Object.assign({}, state, { entry: action.payload });
    default:
      return state;
  }
};

export default moodJournalReducer;
