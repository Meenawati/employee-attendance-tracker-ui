import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import VacationModal from "./VacationModal";
import { fetchEmployee } from "../actions/EmployeeAction";
import { showVacationForm } from "../actions/ApplyVacationAction";
import "./../../resources/css/VacationDetail.css";

class VacationApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false
    };
    this.showForm = this.showForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      openForm: nextProps.vacationModalVisible
    });
  }

  showForm() {
    this.props.showVacationForm();
  }

  render() {
    return (
      <div className="vacation-appln-container">
        <div className="vacation-appln-button-container">
          <div className="vacation-appln-wrap">
            <button className="vacation-appln-button" onClick={this.showForm}>
              APPLY FOR VACATION
            </button>
            <VacationModal />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showVacationForm: showVacationForm,
      fetchEmployeeAction: fetchEmployee
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacationApplication);
