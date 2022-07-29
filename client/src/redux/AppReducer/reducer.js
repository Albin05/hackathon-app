import * as types from "./actiontypes";

const loadData = (key) => {
  try {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  } catch (error) {
    return "";
  }
};

const saveData = (key, data = "") => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  user: loadData("userInfo") || "",
  selectedChat: "",
  singleChat: false,
  isError: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SAVE_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case types.SET_SELECTED_CHAT: {
      return {
        ...state,
        selectedChat: payload,
      };
    }
    case types.RESET_SELECTED_CHAT: {
      return {
        ...state,
        selectedChat: "",
      };
    }
    case types.SET_SINGLE_CHAT: {
      return {
        ...state,
        singleChat: payload,
      };
    }
    default:
      return state;
  }
};
