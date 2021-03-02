import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

import MyTabs from "./MyTabs";

class Myschedule extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content;

    if (isEmpty(profile) || loading) {
      content = <Spinner />;
    } else {
      const { schedules, schedule_dates } = profile.data;

      if (!isEmpty(schedules)) {
        const { past, upcoming } = schedules;
        let upcomingData, pastData;

        // Upcoming data
        if (isEmpty(upcoming)) {
          upcomingData = <h6 className="mt-3 mb-3">No Upcoming Schedule</h6>;
        } else {
          upcomingData = Object.entries(upcoming).map(([key, value]) => (
            <React.Fragment key={key}>
              <h4 className="mt-3 mb-3">
                {schedule_dates["upcoming"][key]["scheDates"]}
              </h4>
              <table className="table table-striped">
                <tbody>
                  {Object.entries(value).map(([key, val]) => (
                    <tr key={key}>
                      <td>{val.call_time}</td>
                      <td>
                        <strong>{val.name}</strong>
                        <br />
                        Event type <strong>{val.type}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ));
        }

        // Past data
        if (isEmpty(past)) {
          pastData = <h6 className="mt-3 mb-3">No Past Schedule</h6>;
        } else {
          pastData = Object.entries(past).map(([key, value]) => (
            <React.Fragment key={key}>
              <h4 className="mt-3 mb-3">
                {schedule_dates["past"][key]["scheDates"]}
              </h4>
              <table className="table table-striped">
                <tbody>
                  {Object.entries(value).map(([key, val]) => (
                    <tr key={key}>
                      <td>{val.call_time}</td>
                      <td>
                        <strong>{val.name}</strong>
                        <br />
                        Event type <strong>{val.type}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ));
        }

        content = (
          <React.Fragment>
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                >
                  Upcoming
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tabs-2"
                  role="tab"
                >
                  Past
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tabs-1" role="tabpanel">
                {upcomingData}
              </div>
              <div className="tab-pane" id="tabs-2" role="tabpanel">
                {pastData}
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        content = (
          <React.Fragment>
            <h6 className="text-muted">No schedule at the moment.</h6>
            <Link to="/dashboard" className="btn btn-primary">
              Make Schedule
            </Link>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-6">My Schedule</h1>
              <MyTabs />
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Myschedule.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Myschedule);
