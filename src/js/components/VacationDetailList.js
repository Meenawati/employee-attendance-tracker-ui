import React from "react";
import moment from "moment";
import "./../../resources/css/VacationDetail.css";
import "./../../resources/css/VacationSummaryUtil.css";

const formatDate = (timeStamp) => moment(timeStamp).format('Do MMMM YYYY, dddd');

const VacationDetailList = props => {
  const vacationDetail = props.vacationDetailList;
  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table100">
            <table>
              <thead>
                <tr className="table100-head">
                  <th className="column1">Date</th>
                  <th className="column2">Vacation Type</th>
                </tr>
              </thead>
              <tbody>
                {vacationDetail.map((row, i) => (
                  <tr key={i}>
                    <td className="column1">{formatDate(row.date)}</td>
                    <td className="column2">{row.vacationType}</td>
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

export default VacationDetailList;
