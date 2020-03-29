import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "react-loader-spinner";

import VacationDetailList from "./VacationDetailList";
import { fetchVacationDetail } from "../actions/VacationDetailAction";
import {
  getVacationDetail,
  getVacationDetailError,
  getVacationDetailPending
} from "../reducers/VacationDetailReducer";

class VacationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount() {
    const { fetchVacationDetail } = this.props;
    fetchVacationDetail();
  }

  shouldComponentRender() {
    const { vacationDetailRequestPending } = this.props;
    return !vacationDetailRequestPending;
  }

  render() {
    const { vacationDetail } = this.props;
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
    if (vacationDetail.length !== 0) {
      return (
        <div>
          <VacationDetailList vacationDetailList={vacationDetail} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  error: getVacationDetailError(state.vacationDetailState),
  vacationDetail: getVacationDetail(state.vacationDetailState),
  vacationDetailRequestPending: getVacationDetailPending(
    state.vacationDetailState
  )
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchVacationDetail: fetchVacationDetail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VacationDetail);
