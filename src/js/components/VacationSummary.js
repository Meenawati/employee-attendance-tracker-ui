import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "react-loader-spinner";

import VacationSummaryList from "./VacationSummaryList";
import { fetchVacationSummary } from "../actions/VacationSummaryAction";
import {
  getVacationSummary,
  getVacationSummaryError,
  getVacationSummaryPending
} from "../reducers/VacationSummaryReducer";

class VacationSummary extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount() {
    const { fetchVacationSummary } = this.props;
    fetchVacationSummary();
  }

  shouldComponentRender() {
    const { vacationSummaryRequestPending } = this.props;
    return !vacationSummaryRequestPending;
  }

  render() {
    const { vacationSummary } = this.props;
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
    if (vacationSummary.length !== 0) {
      return (
        <div>
          <VacationSummaryList vacationSummaryList={vacationSummary} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  error: getVacationSummaryError(state.vacationSummaryState),
  vacationSummary: getVacationSummary(state.vacationSummaryState),
  vacationSummaryRequestPending: getVacationSummaryPending(
    state.vacationSummaryState
  )
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchVacationSummary: fetchVacationSummary
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacationSummary);
