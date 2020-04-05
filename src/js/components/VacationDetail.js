import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "react-loader-spinner";

import VacationDetailList from "./VacationDetailList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { fetchVacationDetail } from "../actions/VacationDetailAction";
import {
  getVacationDetail,
  getVacationDetailError,
  getVacationDetailPending,
  getVacationType
} from "../reducers/VacationDetailReducer";
import "./../../resources/css/VacationDetail.css";

library.add(faTrash, faEdit);

class VacationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vacationType: this.props.vacationType, vDetails: this.props.vacationDetail };
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.vacationDetail){
      this.setState({...this.state, vDetails: nextProps.vacationDetail})
    }
  }

  shouldComponentRender() {
    const { vacationDetailRequestPending } = this.props;
    return !vacationDetailRequestPending;
  }

  render() {
    const vacationDetail = this.state.vDetails;
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
      return (
        <div>No Record Available!</div>
      );
    }
  }
}

const mapStateToProps = state => ({
  error: getVacationDetailError(state.vacationDetailState),
  vacationDetail: getVacationDetail(state.vacationDetailState),
  vacationDetailRequestPending: getVacationDetailPending(
    state.vacationDetailState
  ),
  vacationType: getVacationType(state.vacationDetailState)
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
