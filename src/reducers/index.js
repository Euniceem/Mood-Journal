import { LOAD_ENTRIES } from '../actions';

const initialState = {
  entries: []
};

const moodJournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ENTRIES:
      return Object.assign({}, state, { entries: [...action.payload] });
    default:
      return state;
  }
};

export default moodJournalReducer;
