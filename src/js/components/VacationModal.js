import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import moment from "moment";

import DatePicker from "./DatePicker";
import "./../../resources/css/VacationForm.css";
import {
  saveOrUpdateVacation,
  hideVacationForm
} from "../actions/ApplyVacationAction";
import {
  getVacationModalShowHideState,
  getVacationPostError
} from "../reducers/ApplyVacationReducer";

class VacationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      vacationType: ""
    };
    this.handleVacationTypechange = this.handleVacationTypechange.bind(this);
    this.handleSelectedDaysChange = this.handleSelectedDaysChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleFormValidation = this.handleFormValidation.bind(this);
  }

  handleVacationTypechange(e) {
    this.setState({ ...this.state, vacationType: e.target.value });
  }

  handleSelectedDaysChange(selectedDays) {
    this.setState({ ...this.state, selectedDays });
  }

  handleFormValidation() {
    console.log('this.state.vacationType', this.state.vacationType);
    if (
      typeof this.state.vacationType === "undefined" ||
      this.state.vacationType === ""
    ) {
      alert("Please provide value for vacation type!");
      return false;
    } else if (this.state.selectedDays.length === 0) {
      alert("Please select date(s) from the calendar!");
      return false;
    }

    return true;
  }

  handleSubmitForm(e) {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const vacationType = this.state.vacationType;
      const vacations = this.state.selectedDays.map(date => ({
        date,
        vacationType
      }));
      this.props.saveOrUpdateVacation(vacations);
        this.setState({ ...this.state, vacationType: "" });
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
                >
                  <option />
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

const getVacationTypeList = () => [
  { value: "VACATION", display: "Vacation Leave" },
  { value: "SICK", display: "Sick Leave" },
  { value: "PARENTAL", display: "Parental Leave" },
  { value: "MARRIAGE", display: "Marriage Leave" }
];

const mapStateToProps = state => ({
  vacationModalVisible: getVacationModalShowHideState(state.vacationFormState),
  getVacationPostError: getVacationPostError(state.vacationFormState)
});

const dispatchMappers = {
  saveOrUpdateVacation: saveOrUpdateVacation,
  hideVacationForm: hideVacationForm
};

export default connect(
  mapStateToProps,
  dispatchMappers
)(VacationModal);
