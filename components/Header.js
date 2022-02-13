import React from 'react';
// import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd';

const Header = () => {
  return <div className='header'>
    <Row type="flex" justify='center'>
      <Col>
        <span className='header-logo'>技术胖</span>
        <span className='header-text'>专注前端开发，每年 100 集免费视频。</span>
      </Col>
      <Col>
        <Menu mode='horizontal'>
          <Menu.Item key="home"><Icon type="home" />首页</Menu.Item>
          <Menu.Item key="video"><Icon type="youtube" />视频</Menu.Item>
          <Menu.Item key="life"><Icon type="smile" />生活</Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
}

export default Header;