import axios from "axios";

import { fetchVacationSummary } from "../actions/VacationSummaryAction";

export const FETCH_VACATION_DETAIL_PENDING = "FETCH_VACATION_DETAIL_PENDING";
export const FETCH_VACATION_DETAIL_SUCCESS = "FETCH_VACATION_DETAIL_SUCCESS";
export const FETCH_VACATION_DETAIL_ERROR = "FETCH_VACATION_DETAIL_ERROR";
export const SET_VACATION_TYPE = "SET_VACATION_TYPE";
export const SHOW_VACATION_DETAILS = "SHOW_VACATION_DETAILS";
export const HIDE_VACATION_DETAILS = "HIDE_VACATION_DETAILS";
export const TOGGLE_VACATION_DETAIL = "TOGGLE_VACATION_DETAILS";

export function showVacationDetails() {
  return {
    type: SHOW_VACATION_DETAILS
  };
}

export function hideVacationDetails() {
  return {
    type: HIDE_VACATION_DETAILS
  };
}

export function openVacationDetails() {
  return dispatch => {
    dispatch(showVacationDetails());
  };
}

export function closeVacationDetails() {
  return dispatch => {
    dispatch(hideVacationDetails());
  };
}

export function fetchVacationDetailPending() {
  return {
    type: FETCH_VACATION_DETAIL_PENDING
  };
}

export function fetchVacationDetailSucces(vacationDetail) {
  return {
    type: FETCH_VACATION_DETAIL_SUCCESS,
    payload: vacationDetail
  };
}

export function fetchVacationDetailError(error) {
  return {
    type: FETCH_VACATION_DETAIL_ERROR,
    error: error
  };
}

export function setVacationType(vacationType) {
  return {
    type: SET_VACATION_TYPE,
    payload: vacationType
  };
}

export function changeVacationDetail(visible) {
  return {
    type: TOGGLE_VACATION_DETAIL,
    payload: !visible
  };
}

export function toggleVacationDetail(visible, vacationType) {
  return dispatch => {
    dispatch(changeVacationDetail(visible));
    if (vacationType === null) {
      dispatch(fetchVacationDetail(null));
    }
  };
}

export function selectVacationType(vacationType) {
  return dispatch => {
    dispatch(setVacationType(vacationType));
    dispatch(fetchVacationDetail(vacationType));
    if (vacationType !== null) {
      dispatch(openVacationDetails());
    } else {
      dispatch(closeVacationDetails());
    }
  };
}

export function fetchVacationDetail(vacationType) {
  var url = "http://localhost:8080/employees/1/vacations/";
  console.log();
  if (vacationType !== null) {
    url = url + vacationType;
  }
  return dispatch => {
    dispatch(fetchVacationDetailPending());
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchVacationDetailSucces(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchVacationDetailError(error));
      });
  };
}

export function deleteVacationDetail(vacationDetail, selectedVacationType) {
  const { vacationDetailId } = vacationDetail;
  return dispatch => {
    const url = `http://localhost:8080/employees/1/vacations/${vacationDetailId}`;
    axios
      .delete(url)
      .then(res => {
        dispatch(fetchVacationSummary());
        dispatch(fetchVacationDetail(selectedVacationType));
        dispatch(openVacationDetails());
      })
      .catch(err => {
        alert("Error occured while deleting vacation!");
        console.log(err);
      });
  };
}
