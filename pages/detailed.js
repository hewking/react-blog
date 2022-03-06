import { Col, Row, Breadcrumb } from 'antd'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import detailStyles from '../static/style/pages/detailed.module.css';
import { CalendarOutlined , FolderOutlined, FireOutlined} from '@ant-design/icons';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm'


export default function Detailed() {

  const markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' + 
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```';

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
              <div className='list-icon center'>
                <span><CalendarOutlined />2022-03-06</span>
                <span><FolderOutlined /> 视频教程</span>
                <span><FireOutlined />10000</span>
              </div>
              <div className={detailStyles.detailed_content}>
                <ReactMarkDown children={markdown}
                remarkPlugins={[remarkGfm]} 
                /> 
              </div>
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          </Col>
      </Row>
      <Footer/>
    </div>
  )
} 
