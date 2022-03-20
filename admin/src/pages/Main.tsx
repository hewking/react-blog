import React from "react";
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from "react-router-dom";
import Login from "./Login";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return <div>
    <Outlet/>
  </div>;
}
