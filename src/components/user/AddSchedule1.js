import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { changeFromStep, addSchedule } from "../../actions/profileActions";
import { format, add } from "date-fns";
import TextFieldGroup from "../common/TextFieldGroup";

// let sDate, startTime, endTime, callTime;

class AddSchedule1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      step: false,
      fname: "",
      lname: "",
      email: "",
      type_id: props.event.typeId,
      add_time: props.event.duration,
      type: props.event.type,
      call_date: "",
      call_time: "",
      call_timestamp: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  nextStepChange = () => {
    this.props.changeFromStep(!this.state.step);

    this.sDate = format(this.state.startDate, "EEEE, MMMM dd, yyyy");
    this.startTime = format(this.state.startDate, "hh:mm aaaa");

    this.endTime = format(
      add(this.state.startDate, { minutes: parseInt(this.state.add_time, 10) }),
      "hh:mm aaaa"
    );

    this.callTime = `${this.startTime} - ${this.endTime}`;

    this.setState({
      step: this.state.step,
      type_id: this.state.type_id.toString(),
      call_date: this.state.startDate.toString().replace(/GMT.*/i, ""),
      call_time: this.callTime,
      call_timestamp: this.state.startDate.toString().replace(/GMT.*/i, ""),
    });
  };

  onBackclick = (step) => {
    this.props.changeFromStep(step);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      caller_fname: this.state.fname,
      caller_lname: this.state.lname,
      caller_email: this.state.email,
      type_id: this.state.type_id,
      call_date: format(this.state.startDate, "yyyy-MM-dd"),
      call_time: this.state.call_time,
      call_timestamp: format(this.state.startDate, "yyyy-MM-dd HH:mm:ss"),
    };

    this.props.addSchedule(newUser, this.props.history);
  };

  render() {
    const { step } = this.props.profile;

    if (step) {
      const { errors } = this.state;

      return (
        <React.Fragment>
          <p onClick={this.onBackclick.bind(this, !step)}>
            <i
              className="fas fa-arrow-circle-left"
              style={{ cursor: "pointer", fontSize: "36px" }}
            />
          </p>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="box">
                <h3>John Deo</h3>
                <h2>{this.state.type}</h2>
                <p>
                  <i className="far fa-clock"></i> {this.state.add_time}
                </p>
                <p>
                  {" "}
                  <i className="fas fa-calendar-alt text-info mr-1"></i>
                  {`${this.state.call_time}, ${this.sDate}`}{" "}
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6">
              <h3 className="lead text-center">Enter Details</h3>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="First Name"
                  placeholder="Enter First Name"
                  name="fname"
                  type="text"
                  value={this.state.fname}
                  onChange={this.onChange}
                  error={errors.caller_fname}
                />
                <TextFieldGroup
                  label="Last Name"
                  placeholder="Enter Last Name"
                  name="lname"
                  type="text"
                  value={this.state.lname}
                  onChange={this.onChange}
                  error={errors.caller_lname}
                />
                <TextFieldGroup
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.caller_email}
                />

                <TextFieldGroup
                  name="type_id"
                  type="hidden"
                  value={this.state.type_id}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="call_date"
                  type="hidden"
                  value={this.state.call_date}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="call_time"
                  type="hidden"
                  value={this.state.call_time}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="call_timestamp"
                  type="hidden"
                  value={this.state.call_timestamp}
                  onChange={this.onChange}
                />

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Schedule Event"
                />
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Link to="/dashboard">
          <i
            className="fas fa-arrow-circle-left"
            style={{ fontSize: "36px" }}
          ></i>
        </Link>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="box">
              <h3>John Deo</h3>
              <h2>{this.state.type}</h2>
              <p>
                <i className="far fa-clock"></i> {this.state.add_time}
              </p>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="box">
              <h2>Select Date and Time</h2>
              <div className="form-group">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  onCalendarClose={this.nextStepChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={this.state.startDate}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { changeFromStep, addSchedule })(
  withRouter(AddSchedule1)
);
