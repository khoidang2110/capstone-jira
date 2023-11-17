import { https } from "./config";

export let userService = {
  login: (valueForm) => {
    return https.post("/api/Users/signin", valueForm);
  },
  register: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", valueForm);
  },
  
};

export let projectService = {
  getProjectList: () =>{
    return https.get(`/api/Project/getAllProject`)
  }
}

export let usersManageService = {
  getUsersList: ()=>{
    return https.get(`/api/Users/getUser`)
  }
}