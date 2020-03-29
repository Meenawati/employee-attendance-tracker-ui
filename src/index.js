import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { employeeReducer } from "./js/reducers/EmployeeReducer";
import { vacationSummaryReducer } from "./js/reducers/VacationSummaryReducer";
import { vacationDetailReducer } from "./js/reducers/VacationDetailReducer";
import { vacationModalReducer } from "./js/reducers/ApplyVacationReducer";
import App from "./js/App";

const combinedReducers = combineReducers({
  employeeState: employeeReducer,
  vacationSummaryState: vacationSummaryReducer,
  vacationDetailState: vacationDetailReducer,
  vacationFormState: vacationModalReducer
});

const deletegateReducer = (state, action) => combinedReducers(state, action);

const store = compose(applyMiddleware(thunk))(createStore)(deletegateReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
