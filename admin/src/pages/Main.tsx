import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";
import AdminIndex from "./AdminIndex";
import Login from "./Login";
import { AddArticle } from "./AddArticle";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="index" element={<AdminIndex />}>
          <Route path="add" element={<AddArticle />} />
        </Route>
      </Routes>
    </Router>
  );
}
