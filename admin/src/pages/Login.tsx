import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Card, Input, Spin } from "antd";
import {
  CrownOutlined,
  YoutubeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import '../static/css/login.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const checkLoginIn = ()=> {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

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
          <br/><br/>

        <Button type="primary" size="large" block onClick={checkLoginIn}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );
}
