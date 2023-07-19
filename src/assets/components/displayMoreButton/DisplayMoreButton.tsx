import { useRef } from "react";
//import { useInView } from "react-intersection-observer";
import styles from "./DisplayMoreButton.module.css";
//import Loader from "../Loader/Loader";

interface Props {
  onClick(): void;
  className: string;
  colors: string[];
}

const DisplayMoreButton = ({ onClick, className, colors }: Props) => {
  // const [btnDiv, inView] = useInView({
  //   threshold: 0.5,
  //   triggerOnce: false,
  //   delay: 1,
  // });
  const btn = useRef<HTMLButtonElement>(null);
  // if (inView) {
  //   btn.current?.click();
  // }

  return (
    <div className={styles.btnContainer} /*ref={btnDiv}*/>
      <button
        ref={btn}
        className={[className, styles.btn].join(" ")}
        onClick={onClick}
        style={{ color: colors[4], backgroundColor: colors[2] }}
      >
        Show More
      </button>
    </div>
  );
};

export default DisplayMoreButton;
