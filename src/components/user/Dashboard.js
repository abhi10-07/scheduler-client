import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (isEmpty(profile) || loading) {
      dashboardContent = <Spinner />;
    } else {
      const { type } = profile.data;
      if (!isEmpty(type)) {
        dashboardContent = (
          <React.Fragment>
            <h6 className="text-muted">
              Please add schedule to my calendar by clicking call type
            </h6>
            <ul className="list-group col-md-5">
              {type.map((type, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: "/addschedule",
                    state: {
                      type_id: type.id,
                      duration: type.duration,
                      type: type.name,
                    },
                  }}
                  className="text-decoration-none text-dark"
                >
                  <li className="list-group-item d-flex justify-content-between align-items-center ss">
                    {type.name}
                    <i className="fas fa-angle-right"></i>
                  </li>
                </Link>
              ))}
            </ul>
          </React.Fragment>
        );
      } else {
        dashboardContent = (
          <React.Fragment>
            <h6 className="text-muted">
              No Event type are present, please add to make a schedule.
            </h6>
            <Link to="/addtype" className="btn btn-primary">
              Add Type
            </Link>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <h2 className="text-muted">TODO: Welcome Abhishek </h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
