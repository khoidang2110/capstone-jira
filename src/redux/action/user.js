import { userService } from "../../service/service";
import { SET_INFO } from "../constant/user";

export const loginAction = (formData, callback) => {
  //redux thunk
  return (dispatch) => {
    userService
      .login(formData)
      .then((res) => {
        console.log(res);
        // dispatch({
        //   type: SET_INFO,
        //   payload: res.data.content,
        // });
       
        localStorage.setItem("USER", JSON.stringify(res.data.content));
        //call back dùng window.location.href dùng navigate vì dùng navigate là hook ngoài component ko được
        callback();
        //window.location.href("/");
      })
      .catch((err) => {
        console.log(err);
    
      });
  };
};
// ko dùng navigate được vì hook dùng trong function component

export const setInfoAction  = (payload) => ({
  type: SET_INFO,
  payload
})