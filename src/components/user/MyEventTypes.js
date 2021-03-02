import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

import MyTabs from "./MyTabs";

class MyEventTypes extends Component {
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
      const { type } = profile.data;
      if (!isEmpty(type)) {
        content = (
          <React.Fragment>
            {type.map((type, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card bg-default h-100">
                  <div className="card-header">{type.name}</div>
                  <div className="card-body">
                    <h5 className="card-title text-right">
                      <Link to="/addtype" className="btn btn-warning">
                        Edit
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-6">Event Types</h1>
              <MyTabs />
              <div>
                <div>
                  <Link to="/addtype" className="btn btn-primary float-right">
                    Add Type
                  </Link>
                </div>
                <div className="row">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyEventTypes.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(MyEventTypes);
