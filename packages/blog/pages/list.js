import { Col, Row, List, Breadcrumb } from 'antd'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import listStyles from '../static/style/pages/index.module.css';
import Header from '../components/Header'
import { useState, useEffect, useContext } from 'react';
import { CalendarOutlined, VideoCameraOutlined, FireOutlined } from "@ant-design/icons";
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import servicePath from '../config/apiUrl';
import axios from 'axios';
import Link from 'next/link';


import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

// next 自动支持路由，只要在浏览器输入即可,是通过文件名来访问
// pages/list.js 的文件名访问
export default function MyList(data) {

  const [list, setListData] = useState(data.data);

  useEffect(() => {
    // 当重新render 的时候回每次还行，这里主要是Header 里面的menu 切换的时候刷新数据
    setListData(data.data);
  });

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
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row type="flex" justify='center' className='comm-main'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div' >
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a >视频教程</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div cla>最新日志</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={item => {
              return (<List.Item>
                <div className={listStyles.list_title}>
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className={listStyles.list_icon}>
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><VideoCameraOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}人</span>
                </div>
                <div className={listStyles.list_context} dangerouslySetInnerHTML={
                  { __html: marked(item.introduce) }
                }></div>
              </List.Item>);
            }}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

/**
 * 只在第一次进入的时候回执行
 * @param {*} context 
 * @returns 
 */
MyList.getInitialProps = async (context) => {
  const id = context.query.id;
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getListById + id).then(res => {
      resolve(res.data);
    });
  });
  return await promise;
};
