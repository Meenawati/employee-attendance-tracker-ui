import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import moment from "moment";

import DatePicker from "./DatePicker";
import {
  saveOrUpdateVacation,
  updateVacation,
  hideVacationForm
} from "../actions/ApplyVacationAction";
import { getVacationDetail } from "../reducers/VacationDetailReducer";
import {
  getVacationModalShowHideState,
  getVacationPostError
} from "../reducers/ApplyVacationReducer";
import { getVacationSummary } from "../reducers/VacationSummaryReducer";
import "./../../resources/css/VacationForm.css";

class VacationModal extends React.Component {
  constructor(props) {
    super(props);
    const vd = this.props.vacationDetail;
    this.state = {
      vacationDetailId:
        this.isNotemplyOrNull(vd) && this.isNotemplyOrNull(vd.vacationDetailId)
          ? vd.vacationDetailId
          : null,
      selectedDays:
        this.isNotemplyOrNull(vd) && this.isNotemplyOrNull(vd.date)
          ? [moment(vd.date, "YYYY-MM-DD").toDate()]
          : [],
      vacationType:
        this.isNotemplyOrNull(vd) && this.isNotemplyOrNull(vd.vacationType)
          ? vd.vacationType
          : "VACATION"
    };

    this.handleVacationTypechange = this.handleVacationTypechange.bind(this);
    this.handleSelectedDaysChange = this.handleSelectedDaysChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleFormValidation = this.handleFormValidation.bind(this);
    this.isVacationFull = this.isVacationFull.bind(this);
    this.isNotemplyOrNull = this.isNotemplyOrNull.bind(this);
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.isNotemplyOrNull(nextProps.vacationDetail)) {
  //     const { vacationType, date, vacationDetailId } = nextProps.vacationDetail;
  //     this.setState({
  //       vacationDetailId: vacationDetailId,
  //       selectedDays: this.isNotemplyOrNull(date) ? [date] : [],
  //       vacationType: this.isNotemplyOrNull(vacationType)
  //         ? vacationType
  //         : "VACATION"
  //     });
  //   }
  // }

  isNotemplyOrNull(value) {
    let notEmptyOrNull = true;
    if (typeof value === "undefined" || value === "" || value === null) {
      notEmptyOrNull = false;
    }

    return notEmptyOrNull;
  }

  handleVacationTypechange(e) {
    this.setState({ ...this.state, vacationType: e.target.value });
  }

  handleSelectedDaysChange(selectedDays) {
    this.setState({ ...this.state, selectedDays });
  }

  handleFormValidation() {
    if (
      this.isNotemplyOrNull(this.state.vacationDetailId) &&
      this.state.selectedDays.length > 1
    ) {
      alert(
        "Failed to submit form! Only single day can be selected for updating vacation!"
      );
      return false;
    } else if (!this.isNotemplyOrNull(this.state.vacationType)) {
      alert("Please provide value for vacation type!");
      return false;
    } else if (this.state.selectedDays.length === 0) {
      alert("Please select date(s) from the calendar!");
      return false;
    } else if (
      this.isVacationFull() &&
      !this.isNotemplyOrNull(this.state.vacationDetailId)
    ) {
      alert(
        "Failed to submit form! Vacations are full for selected vacation type."
      );
      return false;
    }

    return true;
  }

  isVacationFull() {
    let full = false;
    this.props.vacationSummary.map(s => {
      if (
        s.vacationType === this.state.vacationType &&
        s.totalDays === s.daysTaken
      ) {
        full = true;
      }
    });
    return full;
  }

  handleSubmitForm(e) {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const vacationType = this.state.vacationType;
      if (this.isNotemplyOrNull(this.state.vacationDetailId)) {
        const vacation = {
          vacationDetailId: this.state.vacationDetailId,
          vacationType: this.state.vacationType,
          date: getFormattedDate(this.state.selectedDays[0])
        };
        this.props.updateVacation(vacation, this.state.vacationType);
      } else {
        const vacations = this.state.selectedDays.map(date => ({
          date: date,
          vacationType
        }));
        this.props.saveOrUpdateVacation(vacations);
      }
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.vacationModalVisible}
        ariaHideApp={false}
        className="modal-dialog"
      >
        <form onSubmit={this.handleSubmitForm}>
          <ul className="form-style-1">
            <li>
              <h3 className="title">VACATION APPLICATION FORM</h3>
              <div className="vacation-type-container">
                <label className="label">Select Vacation Type</label>
                <select
                  type="select"
                  className="field-select"
                  onChange={this.handleVacationTypechange}
                  value={this.state.vacationType}
                >
                  {getVacationTypeList().map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.display}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <div className="date-container">
                <label className="label">Select Date(s)</label>
                <DatePicker
                  name="vacationDates"
                  className="vacation-date-select"
                  onDayChange={this.handleSelectedDaysChange}
                  changeDays={this.handleSelectedDaysChange}
                  initialMonth={
                    this.isNotemplyOrNull(this.state.selectedDays) ||
                    this.state.selectedDays.length !== 0
                      ? this.state.selectedDays[0]
                      : new Date()
                  }
                  selectedDays={this.state.selectedDays}
                />
              </div>
            </li>
            <li>
              <div className="form-buttons">
                <button className="button" onClick={this.handleSubmitForm}>
                  Submit
                </button>
                <button
                  className="button2"
                  onClick={this.props.hideVacationForm}
                >
                  Cancel
                </button>
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    );
  }
}

// const formatDate = date => {
//   const offset = date.getTimezoneOffset();
//   date = new Date(date.getTime() + offset * 60 * 1000);
//   return date.toISOString().split("T")[0];
// };

const getVacationTypeList = () => [
  { value: "VACATION", display: "Vacation Leave" },
  { value: "SICK", display: "Sick Leave" },
  { value: "PARENTAL", display: "Parental Leave" },
  { value: "MARRIAGE", display: "Marriage Leave" }
];

const getFormattedDate = date => {
  var todayTime = date;
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  return year + "-" + month + "-" + day;
};

const mapStateToProps = state => ({
  vacationModalVisible: getVacationModalShowHideState(state.vacationFormState),
  getVacationPostError: getVacationPostError(state.vacationFormState),
  vacationDetails: getVacationDetail(state.vacationDetailState),
  vacationSummary: getVacationSummary(state.vacationSummaryState)
});

const dispatchMappers = {
  updateVacation: updateVacation,
  saveOrUpdateVacation: saveOrUpdateVacation,
  hideVacationForm: hideVacationForm
};

export default connect(
  mapStateToProps,
  dispatchMappers
)(VacationModal);
