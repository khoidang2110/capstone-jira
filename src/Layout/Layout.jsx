import React, { useEffect } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar/MenuBar.jsx";
import PageContent from "../components/PageContent/PageContent.jsx";

import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "../redux/action/project.js";
import {
  projectService,
  userService,
  usersManageService,
} from "../service/service.js";
import { setUsersData } from "../redux/action/userManage.js";

export default function Layout() {
  const navigate = useNavigate();
  let { info } = useSelector((state) => state.userReducer);
  console.log("lấy info", info);
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  // Outlet la nhung gi ben trong Layout
  const dispatch = useDispatch();
  useEffect(() => {
    projectService
      .getProjectList()
      .then((result) => {
        console.log("project list layout", result.data.content);
        dispatch(setProjectData(result.data.content));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  useEffect(() => {
    usersManageService
      .getUsersList()
      .then((result) => {
        console.log("users list layout", result.data.content);
        dispatch(setUsersData(result.data.content));
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  if (USER) {
    return (
      <div>
        <HeaderBar />
        <div className="flex">
          <div>
            <MenuBar />
          </div>
          <div>
            <Outlet />
          </div>
        </div>

        {/* <PageContent/> */}
      </div>
    );
  }
  return (window.location.href = "/login");
}
