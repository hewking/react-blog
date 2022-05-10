import {Avatar, Divider} from 'antd';
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';
import styles from '../static/style/components/author.module.css';

const Author = () => {
  // 怎么才能再把全局的样式加入到className 中进来呢？
  // 在这样大括号中添加，即可， 但是前面的样式会被去除掉，咋整呢
  return (<div className={styles.author_div}>
    <div><Avatar size={100} src="https://avatars.githubusercontent.com/u/8760577?v=4"/></div>
    <div className={styles.author_intro}>
      热爱阅读和思考，我希望把我的经验和思考分享给所有人。
      <Divider>社交账号</Divider>
      <Avatar size={28} icon={<GithubOutlined />} className={styles.account}/>
      <Avatar size={28} icon={<QqOutlined />} className={styles.account}/>
      <Avatar size={28} icon={<WechatOutlined />} className={styles.account}/>
    </div>
  </div>);
}

export default Author;