import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, message, List } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css';
import "antd/dist/antd.css";

const { confirm } = Modal;

interface Article {
  id: number;
  title: string;
  introduce: string;
  view_count: number;
  typeName: string;
  addTime: number;
}

export default function ArticleList() {
  const [list, setList] = useState<Article[]>([]);

  useEffect(() => {

    axios({
      method: "get",
      withCredentials: true,
      url: servicePath.getAriticleList,
    }).then(
      res => {
        setList(res.data.data);
      }
    ).catch(err => {
      message.error(err.message);
    })

  }, []);

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        itemLayout="vertical"
        bordered={true}
        dataSource={list}
        renderItem={(item) => {
          return <Row className="list-div">
            <Col span={8}>
              {item.title}
            </Col>
            <Col span={4}>
              {item.typeName}
            </Col>
            <Col span={4}>
              {item.view_count}
            </Col>
            <Col span={4}>
              <Button type="primary">修改</Button>
              &nbsp;
              <Button >删除 </Button>
            </Col>
          </Row>
        }}
      />
    </div>
  );
}
