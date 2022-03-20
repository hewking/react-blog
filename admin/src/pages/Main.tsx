import React from "react";
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from "react-router-dom";
import AdminIndex from "./AdminIndex";
import Login from "./Login";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="adminIndex" element={<AdminIndex />} />
      </Routes>
    </Router>
  );
}

