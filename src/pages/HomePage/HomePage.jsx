// import React, { useState } from 'react';
// import {
//   FolderOutlined,
//   FileTextOutlined,
//   TeamOutlined,
// } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import TabProjects from '../../components/TabProjects/TabProjects';
// const { Header, Content, Footer, Sider } = Layout;

// const HomePage = () => {
//   const [select, setSelect] = useState();
//   console.log("select",select)
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
//       getItem('View all Projects', 'TabProjects'),
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
//           setSelect(key=> `<${key}/>`)

//         }}
//         />
//       </Sider>
//       <Layout>
      
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
           
//           </Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//             }}
//           >
//         {select}
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
// export default HomePage;