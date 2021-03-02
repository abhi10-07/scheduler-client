import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - get user token
export const loginUser = (userdata) => (dispatch) => {
  axios
    .post("/api/v1/login", userdata)
    .then((res) => {
      // save to local storage
      const { token, code, message, invalid } = res.data;

      if (code) {
        //set token to local storage
        localStorage.setItem("jwtToken", token);
        // set token to auth header
        setAuthToken(token);
        // Decode token to get userdata
        const decoded = jwt_decode(token);
        //set curretn user
        dispatch(setCurrentUser(decoded));
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { invalid, message },
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// logout user
export const logoutUser = () => (dispatch) => {
  // Remove toekn from locastorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future request
  setAuthToken(false);
  // set the current user to {} and isAuthenticate to false
  dispatch(setCurrentUser({}));
};
