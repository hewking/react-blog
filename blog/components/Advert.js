import styles from "../static/style/components/advert.module.css"

const Advert = () => {
  return <div className={styles.ad_div/* 还需要个comm-box */}>
    {/* 100%的意思是img 外层div 的with */}
    <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
    <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
    <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
  </div>
}

export default Advert;