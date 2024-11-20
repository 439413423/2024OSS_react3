import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShowList from "./components/Pages/ShowList.js";
import EditUser from "./components/User/EditUser.js";
import Detail from "./components/Pages/Detail.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/update" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}
