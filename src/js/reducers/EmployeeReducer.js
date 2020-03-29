import {
  FETCH_EMPLOYEE_PENDING,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_ERROR
} from "../actions/EmployeeAction";

const initialState = {
  pending: false,
  employee: {},
  error: null
};

export function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        pending: false,
        employee: action.payload
      };

    case FETCH_EMPLOYEE_ERROR:
      return {
        ...state,
        pending: false,
        payload: action.error
      };
    default:
      return state;
  }
}

export const getEmployee = state => state.employee;
export const getEmployeePending = state => state.pending;
export const getEmployeeError = state => state.error;
