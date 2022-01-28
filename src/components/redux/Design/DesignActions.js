import designTypes from "./DesignTypes";

export const newDesign = (ratios) => ({
  type: designTypes.SET_DESIGN_RATIO,
  payload: ratios,
});
export const addJson = (data) => ({
  type: designTypes.ADD_JSON,
  payload: data,
});
