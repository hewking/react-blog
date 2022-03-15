import React from 'react';
import styles from '../static/style/components/header.module.css'
import { Row, Col, Menu, Icon } from 'antd';
import { CrownOutlined , YoutubeOutlined, HomeOutlined} from '@ant-design/icons';

const Header = () => {
  return <div className={styles.header}>
    <Row type="flex" justify='center'>
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className={styles.header_logo }>瓦尔登湖</span>
        <span className={styles.header_text}>分享开发中的心得体会和自己的见解。</span>
      </Col>
      <Col xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode='horizontal' className={styles.menu}>
          <Menu.Item key="home" className={styles.ant_menu_item}><HomeOutlined className={styles.header_menu_icon}/>首页</Menu.Item>
          <Menu.Item key="video" className={styles.ant_menu_item}><YoutubeOutlined className={styles.header_menu_icon}/>视频</Menu.Item>
          <Menu.Item key="life" className={styles.ant_menu_item}><CrownOutlined className={styles.header_menu_icon}/>生活</Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
}

export default Header;