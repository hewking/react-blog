import styles from "../static/style/components/advert.module.css";

const Advert = () => {
  return (
    <div className={styles.ad_div /* 还需要个comm-box */}>
      {/* 100%的意思是img 外层div 的with */}
      <div>
        <img
          src="https://img95.699pic.com/photo/50045/2484.jpg_wh300.jpg"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://img95.699pic.com/photo/40005/2371.jpg_wh300.jpg"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://img95.699pic.com/photo/40008/3756.jpg_wh300.jpg"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Advert;
