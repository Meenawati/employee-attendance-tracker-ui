import React from "react";
import { connect } from "react-redux";
import "./../../resources/css/VacationSummary.css";
import "./../../resources/css/VacationSummaryUtil.css";
import { selectVacationType } from "./../actions/VacationDetailAction";

class VacationSummaryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: null
    };
    this.handleVacationTypeChange = this.handleVacationTypeChange.bind(this);
  }

  handleVacationTypeChange(vacationType, i) {
    var rowId = i + 1;
    var table = document.getElementById("display-table");

    var rows = table.getElementsByTagName("tr");
    for (var row = 0; row < rows.length; row++) {
      rows[row].style.backgroundColor = "";
    }

    if (this.state.rowId === rowId) {
      rowId = null;
    } else {
      var rowSelected = table.getElementsByTagName("tr")[rowId];
      rowSelected.style.backgroundColor = "yellow";
    }

    this.setState({
      rowId: rowId
    });

    this.props.selectVacationType(rowId !== null ? vacationType : null);
  }

  render() {
    const vacationSummary = this.props.vacationSummaryList;
    return (
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table id="display-table">
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
                    <tr
                      key={i}
                      onClick={() =>
                        this.handleVacationTypeChange(row.vacationType, i)
                      }
                    >
                      <td className="column1">{row.vacationType}</td>
                      <td className="column2">{row.daysTaken}</td>
                      <td className="column3">
                        {row.totalDays - row.daysTaken}
                      </td>
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
  }
}

const mapStateToProps = state => ({});

const dispatchMappers = {
  selectVacationType: selectVacationType
};

export default connect(
  mapStateToProps,
  dispatchMappers
)(VacationSummaryList);
