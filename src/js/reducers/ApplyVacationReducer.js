import {
  SHOW_VACATION_FORM,
  HIDE_VACATION_FORM,
  ADD_VACATION_PENDING,
  ADD_VACATION_SUCCESS,
  ADD_VACATION_ERROR,
  ADD_VACATION_DATES_TO_FORM
} from "../actions/ApplyVacationAction";

const initialState = {
  vacationModalVisible: false,
  pending: false,
  error: false,
  selectedDates: []
};

export function vacationModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_VACATION_FORM:
      return {
        ...state,
        vacationModalVisible: true
      };

    case HIDE_VACATION_FORM:
      return {
        ...state,
        vacationModalVisible: false
      };

    case ADD_VACATION_PENDING:
      return {
        ...state,
        pending: true
      };

    case ADD_VACATION_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false
      };

    case ADD_VACATION_ERROR:
      return {
        ...state,
        pending: false,
        error: true
      };

    case ADD_VACATION_DATES_TO_FORM:
      return {
        ...state,
        pending: false,
        selectedDates: action.payload
      };

    default:
      return state;
  }
}

export const getVacationModalShowHideState = state =>
  state.vacationModalVisible;
export const getVacationPostError = state => state.error;
export const getSelectedDates = state => state.selectedDates;
