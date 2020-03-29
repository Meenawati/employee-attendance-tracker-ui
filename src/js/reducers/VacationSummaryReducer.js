import {
  FETCH_VACATION_SUMMARY_PENDING,
  FETCH_VACATION_SUMMARY_SUCCESS,
  FETCH_VACATION_SUMMARY_ERROR
} from "../actions/VacationSummaryAction";

const initialState = {
  pending: false,
  vacationSummary: [],
  error: null
};

export function vacationSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VACATION_SUMMARY_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_VACATION_SUMMARY_SUCCESS:
      return {
        ...state,
        pending: false,
        vacationSummary: action.payload
      };

    case FETCH_VACATION_SUMMARY_ERROR:
      return {
        ...state,
        pending: false,
        payload: action.error
      };
    default:
      return state;
  }
}

export const getVacationSummary = state => state.vacationSummary;
export const getVacationSummaryPending = state => state.pending;
export const getVacationSummaryError = state => state.error;
