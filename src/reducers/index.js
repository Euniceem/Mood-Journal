import {
  LOAD_ENTRIES,
  LOGIN_USER,
  LOGOUT_USER,
  FETCHED_DATA
} from '../actions';

const initialState = {
  entries: [],
  email: localStorage.getItem('email'),
  loggedIn: localStorage.getItem('loggedIn'),
  data: {
    moodData: {
      avgDay: [],
      avgWeek: [],
      time: []
    },
    emotionData: {
      avgDay: [],
      avgWeek: [],
      time: []
    },
    activityData: {
      avgDay: [],
      avgWeek: [],
      time: []
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
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    case FETCHED_DATA:
      return Object.assign({}, state, { data: action.payload });
    default:
      return state;
  }
};

export default moodJournalReducer;
