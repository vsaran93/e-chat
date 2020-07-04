import axios from "axios";
import { SET_USER_DETAILS, SET_HOME_ROUTE } from "../utils/types";

const api = 'http://localhost:3005/v1/api';
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

export const register = (userData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${api}/user/register`, userData, headers);
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
      const response = await axios.post("/user/login", userData, headers);
      if (response) {
        dispatch(setUserDetails(response.data.user));
      }
    } catch (error) {
      console.log("there is an error", error);
    }
  };
};
