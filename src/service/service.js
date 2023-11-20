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
  getProjectList: () => {
    return https.get(`/api/Project/getAllProject`);
  },
  getTaskPriority: () => {
    return https.get("/api/Priority/getAll?id=0");
  },
  getTaskStatus: () => {
    return https.get('/api/Status/getAll');
  },
  getTaskType: () => {
    return https.get("/api/TaskType/getAll");
  },
};

export let usersManageService = {
  getUsersList: () => {
    return https.get(`/api/Users/getUser`);
  },
};
