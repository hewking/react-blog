import { Col, Row, Breadcrumb, Affix } from 'antd'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import detailStyles from '../static/style/pages/detailed.module.css';
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import axios from 'axios';

import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx';

import servicePath from '../config/apiUrl';

export default function Detailed(props) {

  const { title, addTime, typeName, view_count, introduce, article_content } = props;

  const tocify = new Tocify();
  const renderer = new Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id=${anchor} href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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

  const html = marked(article_content);

  return (
    <div className={styles.container}>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row type="flex" justify='center' className='comm-main'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className={detailStyles.bread_div}>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href='/'>视频教程</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href=''>博客详情</a></Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className={detailStyles.detailed_title}>

              </div>
              <div className={detailStyles.list_icon}>
                <span><CalendarOutlined />{addTime}</span>
                <span><FolderOutlined /> {typeName}</span>
                <span><FireOutlined />{view_count}人</span>
              </div>
              <div className={detailStyles.detailed_content}
                dangerouslySetInnerHTML={{__html: html}}>
              </div>
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            {/* 这样既可css定义的样式和css modules 定义的样式都生效 */}
            <div className={`comm-box ${detailStyles.detailed_nav}`}>
              <div className={detailStyles.nav_title}>文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />
    </div>
  )
}


Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);

  const id = context.query.id;

  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id).then(res => {
      resolve(res.data.data[0]);
    });
  });
  return await promise;
}