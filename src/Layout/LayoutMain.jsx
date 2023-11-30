import React, { useEffect } from "react";
import { Layout, Menu, theme, Button, Avatar } from "antd";
import {
  FileTextOutlined,
  FolderAddOutlined,
  FolderOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData } from "../redux/action/project.js";
import {
  projectService,
  userService,
  usersManageService,
} from "../service/service.js";
import { setUsersData } from "../redux/action/userManage.js";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
export default function LayoutMain() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  let handleLogout = () => {
    // xoá toàn bộ local storage
    localStorage.clear();
    // vừa chuyển trang vừa reload
    // window.location.href="/"
  };
  const items = [
    getItem(
      "Project Maganement",
      "1",
      <NavLink to="/">
        {" "}
        <UnorderedListOutlined />
      </NavLink>
    ),
    getItem(
      "Create Project",
      "2",
      <NavLink to="/newproject">
        {" "}
        <FolderAddOutlined />
      </NavLink>
    ),
    getItem(
      "User Management",
      "3",
      <NavLink to="/users">
        {" "}
        <TeamOutlined />
      </NavLink>
    ),
    ,
    getItem(
      "User Setting",
      "4",
      <NavLink to="/usersetting">
        {" "}
        <SettingOutlined />
      </NavLink>
    ),
    ,
    getItem(
      "Logout",
      "5",
      <NavLink to="/login" onClick={handleLogout}>
        {" "}
        <LogoutOutlined />
      </NavLink>
    ),
  ];
  // let { info } = useSelector((state) => state.userReducer);
  // console.log("lấy info", info);
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);

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

  return (
    <>
      {USER ? (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div
              className="jiraLogo"
              onClick={() => {
                navigate("/");
              }}
            >
              JIRA
            </div>
            <Menu
              defaultSelectedKeys={["1"]}
              theme="dark"
              mode="inline"
              items={items}
              // onClick={({key})=>{
              //   navigate(key)

              // }}
            />
          </Sider>
          <Layout>
            <Header
              className="flex justify-between"
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                className="btnTrigger"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <span className="flex " style={{ fontWeight: "bold" }}>
                <p>Wellcome {USER.name}</p>
                <Avatar
                  size={30}
                  className="mx-3 my-3 "
                  style={{ fontSize: "12px",color:"black" }}
                >
                  {USER.name.slice(0, 2).toUpperCase()}
                </Avatar>
              </span>
            </Header>
            <Content
              style={{
                margin: "24px 10px",
                //   padding: 24,
                minHeight: 475,
                //   background: colorBgContainer,
              }}
            >
              <div
                style={{
                  // overflow: 'scroll',
                  backgroundColor: "#fff",
                  padding: "30px 15px",
                  borderRadius: "10px",
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </>
  );
}
