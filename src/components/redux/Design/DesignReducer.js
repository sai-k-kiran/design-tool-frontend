import designTypes from "./DesignTypes";

const initialState = {
  ratios: {},
  data: {},
};

const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case designTypes.SET_DESIGN_RATIO:
      return {
        ...state,
        ratios: action.payload,
      };
    case designTypes.ADD_JSON:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default designReducer;
