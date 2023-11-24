// import React, { useState } from "react";
// import {
//   FolderOutlined,
//   FileTextOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Header, Content, Footer, Sider } = Layout;

// const PageContent = () => {
//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }
//   const items = [
//     getItem("New Task", "/newproject", <FileTextOutlined />),

//     getItem("Projects", "sub1", <FolderOutlined />, [
//       getItem("View all Projects", "/"),
//       getItem("New Project", "4"),
//     ]),
//     getItem("Users", "/users", <TeamOutlined />),
//   ];
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >
//           Content
//         </Content>
//   );
// };
// export default PageContent;
