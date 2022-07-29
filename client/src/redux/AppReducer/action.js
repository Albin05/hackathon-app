import * as types from "./actiontypes";

export const saveUser = (payload) => (dispatch) => {
  dispatch({ type: types.SAVE_USER, payload });
};

export const saveSelectedChat = (payload) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_CHAT, payload });
};

export const resetSelectedChat = (payload) => (dispatch) => {
  dispatch({ type: types.RESET_SELECTED_CHAT, payload });
};

export const setSingleChat = (payload) => (dispatch) => {
  dispatch({ type: types.SET_SINGLE_CHAT, payload });
};

export const setIsRoomCreated = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ROOM_STATUS, payload });
};
