import { SET_USER_DETAILS, SET_HOME_ROUTE } from "../utils/types";
const initialState = {
  userData: {},
  redirectTo: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        userData: action.data,
      };
    case SET_HOME_ROUTE:
      return {
        ...state,
        redirectTo: action.data
      }
    default:
      return state;
  }
};

export default userReducer;