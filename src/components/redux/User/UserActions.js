import userTypes from "./UserTypes";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});
export const setModal = (data) => ({
  type: userTypes.SET_MODAL,
  payload: data,
});
export const openModal = (data) => ({
  type: userTypes.OPEN_MODAL,
  payload: data,
});
