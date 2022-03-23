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
import ArticleList from "./ArticleList";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="index" element={<AdminIndex />}>
          <Route path="addArticle" element={<AddArticle />}>
            <Route path=":id" element={<AddArticle/>}/>
          </Route>
          {/* 这里和上面在嵌套路径添加id 是一样的效果 */}
          {/* <Route path="addArticle/:id" element={<AddArticle/>}/> */}
          <Route path="articleList" element={<ArticleList/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
