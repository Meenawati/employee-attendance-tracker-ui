export const FETCH_EMPLOYEE_PENDING = "FETCH_EMPLOYEE_PENDING";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const FETCH_EMPLOYEE_ERROR = "FETCH_EMPLOYEE_ERROR";

export function fetchEmployeePending() {
  return {
    type: FETCH_EMPLOYEE_PENDING
  };
}

export function fetchEmployeeSucces(employee) {
  return {
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: employee
  };
}

export function fetchEmployeeError(error) {
  return {
    type: FETCH_EMPLOYEE_ERROR,
    error: error
  };
}

export function fetchEmployee() {
  return dispatch => {
    dispatch(fetchEmployeePending());
    fetch("http://localhost:8080/employees/1")
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }

        dispatch(fetchEmployeeSucces(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchEmployeeError(error));
      });
  };
}
