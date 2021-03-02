import React, { Component } from "react";
import AddSchedule1 from "./AddSchedule1";
import { withRouter } from "react-router-dom";

class AddSchedule extends Component {
  render() {
    const event = {
      typeId: this.props.location.state.type_id,
      duration: this.props.location.state.duration,
      type: this.props.location.state.type,
    };

    return (
      <React.Fragment>
        <AddSchedule1 event={event} />
      </React.Fragment>
    );
  }
}

export default withRouter(AddSchedule);
