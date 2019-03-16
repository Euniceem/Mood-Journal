import { LOAD_ENTRIES, FETCHED_DATA } from '../actions';

const initialState = {
  entries: [],
  avgDay: {},
  avgWeek: {}
};

const moodJournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    case FETCHED_DATA:
      return Object.assign({}, state, {
        avgDay: action.payload.avgDay,
        avgWeek: action.payload.avgWeek
      });
    default:
      return state;
  }
};

export default moodJournalReducer;
