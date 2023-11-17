import React from "react";
import { Route, Routes } from "react-router-dom";
import TabProjects from "../TabProjects/TabProjects";
import NewProject from "../NewProject/NewProject";
import TabUsers from "../TabUsers/TabUsers";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TabProjects />}></Route>
      <Route path="/newproject" element={<NewProject />}></Route>
      <Route path="/users" element={<TabUsers />}></Route>
    </Routes>
  );
}
