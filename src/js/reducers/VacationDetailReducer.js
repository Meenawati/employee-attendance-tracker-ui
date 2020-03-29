import {
  FETCH_VACATION_DETAIL_PENDING,
  FETCH_VACATION_DETAIL_SUCCESS,
  FETCH_VACATION_DETAIL_ERROR
} from "../actions/VacationDetailAction";

const initialState = {
  pending: false,
  vacationDetail: [],
  error: null
};

export function vacationDetailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VACATION_DETAIL_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_VACATION_DETAIL_SUCCESS:
      return {
        ...state,
        pending: false,
        vacationDetail: action.payload
      };

    case FETCH_VACATION_DETAIL_ERROR:
      return {
        ...state,
        pending: false,
        payload: action.error
      };
    default:
      return state;
  }
}

export const getVacationDetail = state => state.vacationDetail;
export const getVacationDetailPending = state => state.pending;
export const getVacationDetailError = state => state.error;
