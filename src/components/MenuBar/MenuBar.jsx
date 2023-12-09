// import React, { useState } from 'react';
// import {
//   FolderOutlined,
//   FileTextOutlined,
//   TeamOutlined,
// } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useNavigate } from 'react-router-dom';
// const { Header, Content, Footer, Sider } = Layout;

// const MenuBar = () => {
//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }
//   const items = [
//     getItem('New Task', '/login', <FileTextOutlined />),
    
//     getItem('Projects', 'sub1', <FolderOutlined />, [
//       getItem('View all Projects', '/project'),
//       getItem('New Project', '4'),
     
//     ]),
//     getItem('Users', 'sub2', <TeamOutlined />),
   
//   ];
//   const navigate=useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout
//       style={{
//         minHeight: '100vh',
//         paddingTop:"60px"
//       }}
//     >
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//         <div className="demo-logo-vertical" />
//         <Menu defaultSelectedKeys={['1']} mode="inline" items={items} 
//         onClick={({key})=>{
//           navigate(key)
//         }}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: '0 16px',
//           }}
//         >
//           <Breadcrumb
//             style={{
//               margin: '16px 0',
//             }}
//           >
//             <Breadcrumb.Item>User</Breadcrumb.Item>
//             <Breadcrumb.Item>Bill</Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//             }}
//           >
//          bill ad
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: 'center',
//           }}
//         >
//           Ant Design ©2023 Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };
// export default MenuBar;