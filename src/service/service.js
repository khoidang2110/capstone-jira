import { https } from "./config";

export let userService = {
  login: (valueForm) => {
    return https.post("/api/Users/signin", valueForm);
  },
  register: (valueForm) => {
    return https.post("/api/Users/signup", valueForm);
  },
};

export let projectService = {
  getProjectDetail: (id) => {
    return https.get(`/api/Project/getProjectDetail?id=${id}`);
  },
  getProjectList: () => {
    return https.get(`/api/Project/getAllProject`);
  },
  getTaskPriority: () => {
    return https.get("/api/Priority/getAll?id=0");
  },
  getTaskStatus: () => {
    return https.get("/api/Status/getAll");
  },
  getTaskType: () => {
    return https.get("/api/TaskType/getAll");
  },
  createTask: (values) => {
    return https.post("/api/Project/createTask", values);
  },
  projectCategory: () => {
    return https.get(`/api/ProjectCategory`);
  },
  createProjectAuthorize: (values) => {
    return https.post(`/api/Project/createProjectAuthorize`, values);
  },
  updateStatus: (values) => {
    return https.put(`/api/Project/updateStatus`, values);
  },
};

export let usersManageService = {
  getUsersList: () => {
    return https.get(`/api/Users/getUser`);
  },
  getUser: (value) => {
    return https.get(`/api/Users/getUser?keyword=${value}`);
  },
  getAssignUser: (value) => {
    return https.post("/api/Project/assignUserProject", value);
  },
};
