import {
  SET_USER_DETAILS,
  SET_HOME_ROUTE,
  USER_LOGOUT,
  SELECT_USER,
  SET_USERS_LIST,
} from "../utils/types";
import { decodeToken } from "../utils/helper";

const initialState = {
  userData: {},
  redirectTo: "",
  selectedUser: "",
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      storeToken(action.data);
      const userData = decodeToken(action.data.token);
      return {
        ...state,
        userData: userData,
      };
    case SET_HOME_ROUTE:
      return {
        ...state,
        redirectTo: action.data,
      };
    case USER_LOGOUT:
      clearToken();
      return {
        userData: {},
        redirectTo: "",
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.data,
      };
    case SET_USERS_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

const storeToken = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("RereshToken", data.refreshToken);
};

const clearToken = () => {
  localStorage.clear();
};
export default userReducer;
