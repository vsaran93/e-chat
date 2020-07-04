import axios from "axios";
import { SET_USER_DETAILS } from "../utils/types";

const headers = {
  "Content-Type": "application/json",
};

export const setUserDetails = (data) => {
  return {
    type: SET_USER_DETAILS,
    data: data,
  };
};
export const register = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/user/register", userData, headers);
      if (response) {
        dispatch(setUserDetails(response.data.user));
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
