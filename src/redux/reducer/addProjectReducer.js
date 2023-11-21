import { GET_ARR_PROJECT_CATEGORY } from "../constant/newProject";

const initialState = {
  arrProjectCategory: [],
};

export const projectCategoryReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_ARR_PROJECT_CATEGORY:
      return { ...state, arrProjectCategory: payload };

    default:
      return state;
  }
};
