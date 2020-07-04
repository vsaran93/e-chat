import { SET_USER_DETAILS } from "../utils/types";
const initialState = {
  userData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        userData: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;