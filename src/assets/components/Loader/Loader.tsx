import styles from "./Loader.module.css";

const Loader = ({ size, colors }: { size: number; colors: string[] }) => {
  return (
    <div className={styles.loaderContainer}>
      <div
        className={styles.loader}
        style={{ width: size + "px", height: size + "px", color: colors[1] }}
      ></div>
    </div>
  );
};

export default Loader;
