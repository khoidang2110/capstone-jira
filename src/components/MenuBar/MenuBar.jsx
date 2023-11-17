import React, { useState } from 'react';
import {
  FolderOutlined,
  FileTextOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Button, Drawer } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const MenuBar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('New Task',"4",<NavLink onClick={()=>{console.log("nhan")
  showDrawer()}}> <FileTextOutlined /></NavLink>,),
    
    getItem('Projects', 'sub1', <FolderOutlined />,[
      getItem('View all Projects',"1",<NavLink to='/'></NavLink>),
      getItem('New Project',"3",<NavLink to='/newproject'></NavLink>),
     
    ]),
    getItem('Users',"2",<NavLink to="/users"> <TeamOutlined /></NavLink>),
   
  ];
  const navigate=useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
    <Layout
      style={{
        minHeight: '100vh',
        paddingTop:"60px",
        // minWidth:"180px"
      }}
    >  <Menu 
    defaultSelectedKeys={['1']} 
    mode="inline" items={items} 
    // onClick={({key})=>{
    //   navigate(key)
     
    // }}
    />
  

    </Layout>
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
    </div>

  );
};
export default MenuBar;