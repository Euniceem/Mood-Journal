import { LOAD_ENTRIES, LOAD_EMOTIONS, LOAD_ACTIVITIES, LOGIN_USER, LOGOUT_USER } from '../actions';

const initialState = {
  entries: [],
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
    default:
      return state;
  }
};

export default moodJournalReducer;
