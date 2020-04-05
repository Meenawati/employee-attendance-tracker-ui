import {
  FETCH_VACATION_DETAIL_PENDING,
  FETCH_VACATION_DETAIL_SUCCESS,
  FETCH_VACATION_DETAIL_ERROR,
  SET_VACATION_TYPE,
  SHOW_VACATION_DETAILS,
  HIDE_VACATION_DETAILS,
  TOGGLE_VACATION_DETAIL
} from "../actions/VacationDetailAction";

const initialState = {
  pending: false,
  vacationDetail: [],
  error: null,
  vacationDetailVisible: false,
  vacationType: null
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
        error: action.payload
      };

    case SET_VACATION_TYPE:
      return {
        ...state,
        vacationType: action.payload
      };

    case SHOW_VACATION_DETAILS:
      return {
        ...state,
        vacationDetailVisible: true
      };

    case HIDE_VACATION_DETAILS:
      return {
        ...state,
        vacationDetailVisible: false
      };

    case TOGGLE_VACATION_DETAIL:
      return {
        ...state,
        vacationDetailVisible: action.payload
      };
    default:
      return state;
  }
}

export const getVacationType = state => state.vacationType;
export const getVacationDetail = state => state.vacationDetail;
export const getVacationDetailPending = state => state.pending;
export const getVacationDetailError = state => state.error;
export const isVacationDetailVisible = state => {
  return state.vacationDetailVisible;
};
