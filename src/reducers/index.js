import {
  LOAD_ENTRIES,
  LOAD_ENTRY,
  LOGIN_USER,
  LOGOUT_USER,
  EDIT_EMAIL,
  EDIT_HOMEPAGE,
  LOAD_EMOTIONS,
  LOAD_ACTIVITIES,
  FETCHED_DATA
} from '../actions';

const initialState = {
  entries: [],
  entry: [],
  email: localStorage.getItem('email'),
  loggedIn: localStorage.getItem('loggedIn'),
  setHomePage: localStorage.getItem('setHomePage'),
  data: {
    moodData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    },
    emotionData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    },
    activityData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    }
  }
};

const moodJournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        loggedIn: true,
        email: action.payload.email
      });
    case LOGOUT_USER:
      return Object.assign({}, state, { loggedIn: false, email: '' });
    case EDIT_EMAIL:
      return Object.assign({}, state, { email: action.payload });
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    case LOAD_EMOTIONS:
      return Object.assign({}, state, { emotions: [...action.payload] });
    case LOAD_ACTIVITIES:
      return Object.assign({}, state, { activities: [...action.payload] });
    case LOAD_ENTRY:
      return Object.assign({}, state, { entry: action.payload });
    case EDIT_HOMEPAGE:
      return Object.assign({}, state, {
        setHomePage: action.payload.result.homepage
      });
    case FETCHED_DATA:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default moodJournalReducer;
