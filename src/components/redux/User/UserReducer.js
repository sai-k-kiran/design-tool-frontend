import userTypes from "./UserTypes";

const initialState = {
  currentUser: null,
  modal: "",
  popup: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case userTypes.OPEN_MODAL:
      return {
        ...state,
        popup: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
