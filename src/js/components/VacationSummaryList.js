import React from "react";
import "./../../resources/css/VacationSummary.css";
import "./../../resources/css/VacationSummaryUtil.css";

const VacationSummaryList = props => {
  const vacationSummary = props.vacationSummaryList;
  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table100">
            <table>
              <thead>
                <tr className="table100-head">
                  <th className="column1">Vacation Type</th>
                  <th className="column2">Days Taken</th>
                  <th className="column3">Available Days</th>
                  <th className="column4">Total Days</th>
                </tr>
              </thead>
              <tbody>
                {vacationSummary.map((row, i) => (
                  <tr key={i}>
                    <td className="column1">{row.vacationType}</td>
                    <td className="column2">{row.daysTaken}</td>
                    <td className="column3">{row.totalDays - row.daysTaken}</td>
                    <td className="column4">{row.totalDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationSummaryList;
