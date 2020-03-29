export const FETCH_VACATION_SUMMARY_PENDING = "FETCH_VACATION_SUMMARY_PENDING";
export const FETCH_VACATION_SUMMARY_SUCCESS = "FETCH_VACATION_SUMMARY_SUCCESS";
export const FETCH_VACATION_SUMMARY_ERROR = "FETCH_VACATION_SUMMARY_ERROR";

export function fetchVacationSummaryPending() {
  return {
    type: FETCH_VACATION_SUMMARY_PENDING
  };
}

export function fetchVacationSummarySucces(vacationSummary) {
  return {
    type: FETCH_VACATION_SUMMARY_SUCCESS,
    payload: vacationSummary
  };
}

export function fetchVacationSummaryError(error) {
  return {
    type: FETCH_VACATION_SUMMARY_ERROR,
    error: error
  };
}

export function fetchVacationSummary() {
  return dispatch => {
    dispatch(fetchVacationSummaryPending());
    fetch("http://localhost:8080/employees/1/vacations/summary")
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }

        dispatch(fetchVacationSummarySucces(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchVacationSummaryError(error));
      });
  };
}
