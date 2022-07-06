import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Card, Input, Spin, message } from "antd";
import {
  CrownOutlined,
  YoutubeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "../static/css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import servicePath from "../config/apiUrl";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLoginIn = () => {
    setLoading(true);
    if (!username) {
      message.error("请输入用户名");
      setLoading(false);
      return false;
    } else if (!password) {
      message.error("请输入密码");
      setLoading(false);
      return false;
    }

    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: {
        userName: username,
        password: password,
      },
      withCredentials: true, // 前后端共享session
    })
      .then((res) => {
        setLoading(false);
        if (res.data.data === "登录成功") {
          localStorage.setItem("openId", res.data.openId);
          navigate("/index/addArticle");
          // props.history.push('/index'); react-router v5
        } else {
          message.error("用户名或密码错误");
        }
      })
      .catch((err) => {
        message.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={loading}>
        <Card
          title="jianhao blog system"
          className="login-card"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<CrownOutlined style={{ color: "rgba(0,0,0255)" }} />}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* 一个<br/> 代表空行没有空格，两个代表换行 */}
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<CrownOutlined style={{ color: "rgba(0,0,0255)" }} />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <Button type="primary" size="large" block onClick={checkLoginIn}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
}
