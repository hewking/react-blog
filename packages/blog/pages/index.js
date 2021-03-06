import { Col, Row, List } from "antd";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import listStyles from "../static/style/pages/index.module.css";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import {
  CalendarOutlined,
  VideoCameraOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";

import { marked, Renderer } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import servicePath from "../config/apiUrl";

export default function Home(data) {
  const [list, setList] = useState(data.data);

  const renderer = new Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true, // github 样式差不多的md 展示
    pedantic: false,
    sanitize: false, // 允许html标签
    tables: true,
    breaks: false,
    smartLists: true,
    innerHeight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={(item) => {
              return (
                <List.Item>
                  <div className={listStyles.list_title}>
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className={listStyles.list_icon}>
                    <span>
                      <CalendarOutlined />
                      {item.addTime}
                    </span>
                    <span>
                      <VideoCameraOutlined />
                      {item.typeName}
                    </span>
                    <span>
                      <FireOutlined />
                      {item.view_count}人
                    </span>
                  </div>
                  <div
                    className={listStyles.list_context}
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              );
            }}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      console.log("------>", res.data);
      resolve(res.data);
    });
  });

  return await promise;
};
