import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "react-loader-spinner";

import "./../../resources/css/App.css";
import "./../../resources/css/Header.css";
import { fetchEmployee } from "../actions/EmployeeAction";
import {
  getEmployeeError,
  getEmployeePending,
  getEmployee
} from "../reducers/EmployeeReducer";

class EmployeeView extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount() {
    const { fetchEmployee } = this.props;
    fetchEmployee();
  }

  shouldComponentRender() {
    const { employeeRequestPending } = this.props;
    return !employeeRequestPending;
  }

  render() {
    const { employee } = this.props;
    if (!this.shouldComponentRender())
      return (
        <div className="spinner-center">
          <Loader
            visible={true}
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} //10 secs
          />
        </div>
      );

    return (
      <div className="meta">
        <a href="#" className="author"></a>
        <br />
        {employee.name} | {employee.department}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeError: getEmployeeError(state.employeeState),
  employee: getEmployee(state.employeeState),
  employeeRequestPending: getEmployeePending(state.employeeState)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchEmployee: fetchEmployee
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeView);
