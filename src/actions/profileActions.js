import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CHANGE_STEP,
} from "./types";

// GET current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/v1/user/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const addEventType = (typeData, history) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .post("/api/v1/user/events", typeData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// export const getEventTypes = () => (dispatch) => {
//   dispatch(setProfileLoading());
//   axios
//     .get("/api/v1/user/events")
//     .then((res) =>
//       dispatch({
//         type: GET_TYPES,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

// change form steps
export const changeFromStep = (stepData) => (dispatch) => {
  dispatch({
    type: CHANGE_STEP,
    payload: stepData,
  });
};

// add schedule
export const addSchedule = (typeData, history) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .post("/api/v1/user/schedules", typeData)
    .then((res) => history.push("/myschedule"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
