import {
  GET_ASSIGN_USER,
  GET_USER_SEARCH,
  SET_USERS,
} from "../constant/usersManage";

const initialState = {
  usersRedux: false,
  userSearch: [],
  assignUser: [],
};

export let usersManageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, usersRedux: payload };
    case GET_USER_SEARCH:
      return { ...state, userSearch: payload };
    case GET_ASSIGN_USER:
      return { ...state, assignUser: payload };
    default:
      return state;
  }
};
