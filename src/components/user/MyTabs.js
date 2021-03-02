import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyTabs extends Component {
  constructor() {
    super();

    this.state = {
      active: "",
    };
  }

  render() {
    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/myeventstypes" className="btn btn-light">
          <i className="fas fa-phone text-info mr-1"></i> Event Types
        </Link>
        <Link to="/myschedule" className="btn btn-light">
          <i className="fas fa-calendar-alt text-info mr-1"></i> All Schedules
        </Link>
      </div>
    );
  }
}

export default MyTabs;
