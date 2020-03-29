import request from "superagent";

import { fetchVacationSummary } from "../actions/VacationSummaryAction";
import { fetchVacationDetail } from "../actions/VacationDetailAction";

export const SHOW_VACATION_FORM = "SHOW_VACATION_FORM";
export const HIDE_VACATION_FORM = "HIDE_VACATION_FORM";
export const ADD_VACATION = "ADD_VACATION";
export const ADD_VACATION_PENDING = "ADD_VACATION_PENDING";
export const ADD_VACATION_SUCCESS = "ADD_VACATION_SUCCESS";
export const ADD_VACATION_ERROR = "ADD_VACATION_ERROR";
export const ADD_VACATION_DATES_TO_FORM = "ADD_VACATION_DATES_TO_FORM";

export function addVacationPending() {
  return {
    type: ADD_VACATION_PENDING
  };
}

export function addVacationSucces() {
  return {
    type: ADD_VACATION_SUCCESS
  };
}

export function addVacationError() {
  return {
    type: ADD_VACATION_ERROR
  };
}

export function openVacationForm() {
  return {
    type: SHOW_VACATION_FORM
  };
}

export function closeVacationForm() {
  return {
    type: HIDE_VACATION_FORM
  };
}

export function onAddSelectedDates(selectedDates) {
  return {
    type: ADD_VACATION_DATES_TO_FORM,
    payload: selectedDates
  };
}

export function saveOrUpdateVacation(vacations) {
  return dispatch => {
    dispatch(addVacationPending());
    request
      .post("http://localhost:8080/employees/1/vacations")
      .send(vacations)
      .set("Accept", "application/json")
      .then(res => {
        if (res.error) {
          throw res.error;
        }

        dispatch(hideVacationForm());
        dispatch(fetchVacationSummary());
        dispatch(fetchVacationDetail());
        alert("Vacation application sent successfully");
        return res;
      })
      .catch(error => {
        dispatch(showFormError());
        alert("Oops! error occurred while submitting application!");
        return error;
      });
  };
}

export function hideVacationForm() {
  return dispatch => dispatch(closeVacationForm());
}

export function showVacationForm() {
  return dispatch => dispatch(openVacationForm());
}

export function addSelectedDates(selectedDates) {
  return dispatch => dispatch(onAddSelectedDates(selectedDates));
}

export function showFormError(err) {
  return dispatch => dispatch(addVacationError(err));
}
