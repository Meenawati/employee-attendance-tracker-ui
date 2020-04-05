import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../../resources/css/VacationDetail.css";
import "./../../resources/css/VacationSummaryUtil.css";
import { deleteVacationDetail } from "./../actions/VacationDetailAction";
import { showVacationForm } from "../actions/ApplyVacationAction";
import VacationModal from "./VacationModal";
import { getVacationType } from "../reducers/VacationDetailReducer";
import { getVacationModalShowHideState } from "../reducers/ApplyVacationReducer";

const formatDate = timeStamp => moment(timeStamp).format("Do MMMM YYYY, dddd");

class VacationDetailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowClicked: false
    };
    this.showForm = this.showForm.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete(row) {
    const val = window.confirm("Are you sure you want to delete the vacation?");
    if (val) {
      this.props.deleteVacationDetail(row, this.props.selectedVacationType);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps);
  //   this.setState({
  //     ...this.state,
  //     openForm: nextProps.vacationModalVisible
  //   });
  // }

  showForm(row) {
    this.setState({ rowClicked: row });
    this.props.showVacationForm();
  }

  render() {
    const vacationDetail = this.props.vacationDetailList;
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
                    <th className="column3">Edit</th>
                    <th className="column4">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationDetail.map((row, i) => (
                    <tr key={i}>
                      <td className="column1">{formatDate(row.date)}</td>
                      <td className="column2">{row.vacationType}</td>
                      <td className="column3">
                        {
                          <span>
                            <FontAwesomeIcon
                              className="faicons"
                              icon="edit"
                              onClick={() => this.showForm(row)}
                            />
                          </span>
                        }
                      </td>
                      <td className="column4">
                        {
                          <span>
                            <FontAwesomeIcon
                              className="faicons"
                              icon="trash"
                              onClick={() => this.delete(row)}
                            />
                          </span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.props.vacationModalVisible ? (
          <VacationModal
            vacationDetail={this.state.rowClicked}
            selectedVacationType={this.props.selectedVacationType}
          />) : (<div />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedVacationType: getVacationType(state.vacationDetailState),
  vacationModalVisible: getVacationModalShowHideState(state.vacationFormState)
});

const dispatchMappers = {
  showVacationForm: showVacationForm,
  deleteVacationDetail: deleteVacationDetail
};

export default connect(
  mapStateToProps,
  dispatchMappers
)(VacationDetailList);
