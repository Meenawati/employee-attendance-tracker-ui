import React from "react";
import { connect } from "react-redux";
import "./../../resources/css/VacationDetail.css";
import { getVacationType, isVacationDetailVisible } from "../reducers/VacationDetailReducer";
import { openVacationDetails, closeVacationDetails, fetchVacationDetail, toggleVacationDetail } from "./../actions/VacationDetailAction";

class VacationDetailToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    this.props.toggleVacationDetail(this.props.vacationDetailVisible, this.props.vacationType);
  }

  render() {
    var { title, children } = this.props;
		const opened = this.props.vacationDetailVisible;
    if (opened) {
      title = "HIDE VACATION DETAILS";
    } else {
      title = "SHOW VACATION DETAILS";
    }

    return (
      <div className="vacation-detail-container">
        <div className="vacation-details-button-container">
          <div className="vacation-details-wrap">
            <button
              className="vacation-details-button"
              onClick={this.toggleBox}
            >
              {title}
            </button>
          </div>
        </div>
        {opened && (
					<div className="vacation-details-box-content">
						{children}
					</div>
				)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vacationType: getVacationType(state.vacationDetailState),
  vacationDetailVisible: isVacationDetailVisible(state.vacationDetailState)
});

const dispatchMappers = {
  openVacationDetails: openVacationDetails,
  closeVacationDetails: closeVacationDetails,
  fetchVacationDetail: fetchVacationDetail,
  toggleVacationDetail: toggleVacationDetail
};

export default connect(
  mapStateToProps,
  dispatchMappers
)(VacationDetailToggle);
