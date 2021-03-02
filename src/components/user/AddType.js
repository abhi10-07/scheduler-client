import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";

import { addEventType } from "../../actions/profileActions";

class AddType extends Component {
  constructor() {
    super();

    this.state = {
      type: "",
      other_duration: "",
      selectedOption: "",
      rchecked: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "other_duration") {
      this.setState({ selectedOption: "" });
      this.setState({ rchecked: "" });
    }
  };

  handleCheckClick = (e) => {
    this.setState({ selectedOption: e.target.value });
    this.setState({ rchecked: e.target.value });
    this.setState({ other_duration: "" });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      name: this.state.type,
      duration: isEmpty(this.state.selectedOption)
        ? this.state.other_duration
        : this.state.selectedOption,
    };

    this.props.addEventType(eventData, this.props.history);
  };

  render() {
    const rchecked = this.state.rchecked;
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/myschedule" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Type</h1>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter type of Event"
                  name="type"
                  type="text"
                  value={this.state.type}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <div className="form-group">
                  <section className="plan cf">
                    <h2>Choose Duration:</h2>
                    <label
                      className={classnames("free-label four col", {
                        "r-checked": rchecked === "30 mins",
                      })}
                    >
                      30 mins
                      <input
                        type="radio"
                        name="radio1"
                        id="basic"
                        value="30 mins"
                        checked={this.state.selectedOption === "30 mins"}
                        onChange={this.handleCheckClick}
                      />
                    </label>
                    <label
                      className={classnames("free-label four col", {
                        "r-checked": rchecked === "45 mins",
                      })}
                    >
                      45 mins
                      <input
                        type="radio"
                        name="radio1"
                        id="basic"
                        value="45 mins"
                        checked={this.state.selectedOption === "45 mins"}
                        onChange={this.handleCheckClick}
                      />
                    </label>
                    <label
                      className={classnames("free-label four col", {
                        "r-checked": rchecked === "60 mins",
                      })}
                    >
                      60 mins
                      <input
                        type="radio"
                        name="radio1"
                        id="basic"
                        value="60 mins"
                        // checked={this.state.selectedOption === "60 mins"}
                        checked="checked"
                        onChange={this.handleCheckClick}
                      />
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-md four"
                      placeholder="Other Duration"
                      name="other_duration"
                      value={this.state.other_duration}
                      onChange={this.onChange}
                    />
                    {errors.duration && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {errors.duration}
                      </div>
                    )}
                  </section>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddType.propTypes = {
  auth: PropTypes.object.isRequired,
  addEventType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { addEventType })(withRouter(AddType));
