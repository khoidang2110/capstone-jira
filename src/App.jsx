import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Layout from "./Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabProjects from "./components/TabProjects/TabProjects";
import TabUsers from "./components/TabUsers/TabUsers";

import HomePage from "./pages/HomePage/HomePage";
import NewProject from "./components/NewProject/NewProject";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<TabProjects />}></Route>
            <Route path="/users" element={<TabUsers />}></Route>
          </Route>
          <Route path="/newproject" element={<NewProject />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
