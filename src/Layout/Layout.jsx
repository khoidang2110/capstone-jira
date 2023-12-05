import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import HomePage from "../pages/HomePage/HomePage";


export default function Layout() {
  // Outlet la nhung gi ben trong Layout
  return (
    <div>
      <Header />
      <HomePage/>
      <div className='flex-grow'>
       <Outlet/>
        </div>
      
    </div>
  );
}
