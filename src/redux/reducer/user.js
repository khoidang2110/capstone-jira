import { SET_INFO} from "../constant/user";

let userJson = localStorage.getItem("USER");
let user = JSON.parse(userJson);
let newUser= false
if(user) {
  let newUser = user;
}

const initialState = {
  info: newUser,
};

export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      return { ...state, info: payload };

    default:
      return state;
  }
};
