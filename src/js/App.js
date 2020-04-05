import React from "react";
import Header from "./components/Header";
import EmployeeView from "./components/EmployeeView";
import VacationSummary from "./components/VacationSummary";
import VacationDetailToggle from "./components/VacationDetailToggle";
import VacationDetail from "./components/VacationDetail";
import VacationApplication from "./components/VacationApplication";
import "../resources/css/App.css";


function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-employee-vacation-summary-container">
        <EmployeeView />
        <VacationApplication />
        <VacationSummary />
      </div>
      <VacationDetailToggle>
        <VacationDetail />
      </VacationDetailToggle>
    </div>
  );
}

export default App;
