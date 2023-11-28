// import React, { useEffect } from "react";
// import HeaderBar from "../components/HeaderBar/HeaderBar.jsx";
// import { Outlet, useNavigate } from "react-router-dom";
// import MenuBar from "../components/MenuBar/MenuBar.jsx";
// //import PageContent from "../components/PageContent/PageContent.jsx";
// import LoginPage from "../pages/LoginPage/LoginPage.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { setProjectData } from "../redux/action/project.js";
// import {
//   projectService,
//   userService,
//   usersManageService,
// } from "../service/service.js";
// import { setUsersData } from "../redux/action/userManage.js";
// import Sider from "antd/es/layout/Sider.js";
// import { useState } from "react";
// import {
//   Breadcrumb,
//   Layout,
//   Menu,
//   theme,
//   Button,
//   Drawer,
//   Checkbox,
//   Form,
//   Input,
//   Select,
//   InputNumber,
//   Slider,
//   ConfigProvider,
//   message,
// } from "antd";
// export default function Layout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   // let { info } = useSelector((state) => state.userReducer);
//   // console.log("lấy info", info);
//   let userJson = localStorage.getItem("USER");
//   let USER = JSON.parse(userJson);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     projectService
//       .getProjectList()
//       .then((result) => {
//         console.log("project list layout", result.data.content);
//         dispatch(setProjectData(result.data.content));
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }, []);
//   useEffect(() => {
//     usersManageService
//       .getUsersList()
//       .then((result) => {
//         console.log("users list layout", result.data.content);
//         dispatch(setUsersData(result.data.content));
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }, []);

//   return (
//     <div>
//       {" "}
//       {USER ? (
//         <div>
//             <Layout
//         style={{
//           minHeight: "100vh",
//           paddingTop: "60px",
//           // minWidth:"180px"
//         }}
//       >
//         {/* {" "} */}
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//         <Menu
//           defaultSelectedKeys={["1"]}
//           theme="dark"
//           mode="inline"
//           items={items}
//           // onClick={({key})=>{
//           //   navigate(key)

//           // }}
//         />
//          </Sider>
//          <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 380,
//             background: colorBgContainer,
//           }}
//         >
//           <Outlet/>
//         </Content>
//       </Layout>
//       </Layout>
//           {/* <HeaderBar /> */}
//           {/* <div className="container flex" style={{marginLeft:0}}>
//             <div className="">
//               <MenuBar />
//             </div>
//             <div > */}
//              {/* Outlet la nhung gi ben trong Layout */}
//               {/* <Outlet /> */}
//             {/* </div>
//           </div > */}
//         </div>
//       ) : (
//         <div>
//           <LoginPage />
//         </div>
//       )}
//     </div>
//   );
// }
