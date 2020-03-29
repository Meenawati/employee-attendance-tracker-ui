import React from "react";
import "./../../resources/css/VacationDetail.css";

class VacationDetailToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  render() {
    var { title, children } = this.props;
    const { opened } = this.state;
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
          <div className="vacation-details-box-content">{children}</div>
        )}
      </div>
    );
  }
}

export default VacationDetailToggle;
