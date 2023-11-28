import {
  GET_ASSIGN_USER,
  GET_USER_SEARCH,
  SET_USERS,
} from "../constant/usersManage";

export const setUsersData = (payload) => ({
  type: SET_USERS,
  payload,
});

export const getUserSearchAction = (payload) => ({
  type: GET_USER_SEARCH,
  payload,
});

export const getAssignUserAction = (payload) => ({
  type: GET_ASSIGN_USER,
  payload,
});
