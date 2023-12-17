import { SET_INFO} from "../constant/user";

// let userJson = localStorage.getItem("USER");
// let user = JSON.parse(userJson);
// let newUser= false
// if(user) {
//   let newUser = user;
// }

const initialState = {
  user:false,
};

export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      return { ...state, user: payload };

    default:
      return state;
  }
};


