import axios from "axios";

const getUserToken = () => {
  return localStorage.getItem("token");
};

const setAuthHeader = () => {
  return {
    headers: {
      "x-access-token": getUserToken(),
    },
  };
};

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `api/message/add`,
        messageData,
        setAuthHeader()
      );
      if (result) {
        debugger;
      }
    } catch (error) {
      console.log("there is an error", error);
    }
  };
};
