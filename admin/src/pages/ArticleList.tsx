import React, { useState, useEffect } from "react";
import { Button, Row, Col, Modal, message, List } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "antd/dist/antd.css";
import "../static/css/ArticleList.css";

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
    })
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  const deleteArticle = (id: number) => {
    confirm({
      title: "确定要删除这篇文章吗？",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios({
          method: "get",
          withCredentials: true,
          url: servicePath.deleteArticle + id,
        })
          .then((res) => {
            message.success("文章删除成功");
            setList(list.filter((item) => item.id !== id));
          })
          .catch((err) => {
            message.error(err.message);
          });
      },
      onCancel() {
        message.success("操作已取消");
      },
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={2}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>添加时间</b>
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
        bordered
        dataSource={list}
        renderItem={(item) => {
          return (
            <List.Item>
              <Row className="list-div">
                <Col span={8}>{item.title}</Col>
                <Col span={2}>{item.typeName}</Col>
                <Col span={4}>{item.addTime}</Col>
                <Col span={4}>{item.view_count}</Col>
                <Col span={4}>
                  <Button type="primary">修改</Button>
                  &nbsp;
                  <Button
                    onClick={() => {
                      deleteArticle(item.id);
                    }}
                  >
                    删除{" "}
                  </Button>
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
