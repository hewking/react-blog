import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, message, List } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { confirm } = Modal;

interface Article {
  id: number;
  typeId: number;
  title: string;
  introduce: string;
  articleContent: string;
  view_count: number;
}

export default function ArticleList() {
  const [list, setList] = useState<Article[]>([]);

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
        bordered
        dataSource={list}
        renderItem={(item) => {
          return <Row className="list-div">
            <Col span={8}>
              {item.title}
            </Col>
            <Col span={4}>
              {item.typeId}
            </Col>
            <Col span={4}>
              {item.view_count}
            </Col>
            <Col span={4}>
              <Button type="primary">修改</Button>
              <Button type="primary">删除</Button>
            </Col>
          </Row>
        }}
      />
    </div>
  );
}
