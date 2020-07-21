import axios from "axios";
import { SET_USER_DETAILS, SET_HOME_ROUTE, USER_LOGOUT } from "../utils/types";

const headers = {
  "Content-Type": "application/json",
};
const homeRoute = "/home";

export const setUserDetails = (data) => {
  return {
    type: SET_USER_DETAILS,
    data: data,
  };
};

export const navigateToHome = () => {
  return {
    type: SET_HOME_ROUTE,
    data: homeRoute,
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGOUT });
    } catch (error) {
      console.log("there is an error", error);
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`api/user/register`, userData, headers);
      if (result) {
        dispatch(setUserDetails(result.data.data.response));
        dispatch(navigateToHome());
      }
    } catch (error) {
      console.log("there is an error", error);
    }
  };
};
export const login = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`api/user/login`, userData, headers);
      if (response) {
        dispatch(setUserDetails(response.data.data));
        dispatch(navigateToHome());
      }
    } catch (error) {
      console.log("there is an error", error);
    }
  };
};
