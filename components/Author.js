import {Avatar, Divider} from 'antd';
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';
import styles from '../static/style/components/author.module.css';

const Author = () => {
  // 怎么才能再把全局的样式加入到className 中进来呢？
  // 在这样大括号中添加，即可， 但是前面的样式会被去除掉，咋整呢
  return (<div className={styles.author_div}>
    <div><Avatar size={100} src="https://blogimages.jspang.com/blogtouxiang1.jpg"/></div>
    <div className={styles.author_intro}>
      从现在起就开始牛逼了了，所有的事儿从今天开始都要能够得到根本的改变，改变正在发生，系统化的学习开始
      <Divider>社交账号</Divider>
      <Avatar size={28} icon={<GithubOutlined />} className={styles.account}/>
      <Avatar size={28} icon={<QqOutlined />} className={styles.account}/>
      <Avatar size={28} icon={<WechatOutlined />} className={styles.account}/>
    </div>
  </div>);
}

export default Author;