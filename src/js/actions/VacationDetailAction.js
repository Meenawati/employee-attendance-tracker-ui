export const FETCH_VACATION_DETAIL_PENDING = "FETCH_VACATION_DETAIL_PENDING";
export const FETCH_VACATION_DETAIL_SUCCESS = "FETCH_VACATION_DETAIL_SUCCESS";
export const FETCH_VACATION_DETAIL_ERROR = "FETCH_VACATION_DETAIL_ERROR";

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

export function fetchVacationDetail() {
  return dispatch => {
    dispatch(fetchVacationDetailPending());
    fetch("http://localhost:8080/employees/1/vacations")
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
