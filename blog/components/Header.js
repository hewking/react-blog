import React, {useState, useEffect} from 'react';
import styles from '../static/style/components/header.module.css'
import { Row, Col, Menu, Icon } from 'antd';
import { CrownOutlined , YoutubeOutlined, HomeOutlined} from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const Header = () => {

  const [typeArr, setTypeArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(servicePath.getTypeInfo).then(res => {
        return res.data.data;
      })
      setTypeArr(results);
    } 
    fetchData();
  }, []); // [] 空数组表示只执行一次，不管什么时候都执行

  console.log('typeArr', typeArr);


  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/');
    } else {
      Router.push('/list/?id=' + e.key);
    }
  };

  const typeIcon = (icon, className) => {
    return React.createElement(Icons[icon], { className: className });
  }

  return <div className={styles.header}>
    <Row type="flex" justify='center'>
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <span className={styles.header_logo }>瓦尔登湖</span>
        <span className={styles.header_text}>分享开发中的心得体会和自己的见解。</span>
      </Col>
      <Col xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode='horizontal' className={styles.menu} onClick={handleClick}>
          <Menu.Item key="0" className={styles.ant_menu_item}><HomeOutlined className={styles.header_menu_icon}/>首页</Menu.Item>
          {
            typeArr && typeArr.map((item, index) => {
              return <Menu.Item key={item.id} className={styles.ant_menu_item}>{item.icon && typeIcon(item.icon,styles.header_menu_icon)}{item.typeName}</Menu.Item>
            })
          }
        </Menu>
      </Col>
    </Row>
  </div>
}

export default Header;