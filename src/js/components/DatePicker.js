import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    const days = this.props.selectedDays;
    this.state = {
      selectedDays: days
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    this.props.changeDays(selectedDays);
  }

  render() {
    const today = new Date();
    return (
      <div>
        <DayPicker
          initialMonth={this.props.initialMonth}
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          disabledDays={[
            { before: today },
            { daysOfWeek: [0, 6] }
          ]}
        />
      </div>
    );
  }
}

export default DatePicker;
