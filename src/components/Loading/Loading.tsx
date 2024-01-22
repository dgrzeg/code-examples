import styles from './loading.module.css';

const loading = () => (
  <div className={styles.backdrop}>
    <span className={styles.loader}></span>
  </div>
);

export default loading;
