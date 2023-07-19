import { useRef } from "react";
import styles from "./SideBar.module.css";
import Loader from "../Loader/Loader";

interface option {
  id: number;
  name: string;
  image_background: string;
}
interface Props {
  title: string;
  options: option[];
  onClick(id: string): void;
  visible: boolean;
  className: string;
  colors: string[];
}

const SideBar = ({ title, options, onClick, visible, colors }: Props) => {
  const ul = useRef<HTMLUListElement>(null);
  const clicked = (
    id: string,
    li: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    onClick(id);
    const lis = ul.current?.children;
    if (lis) {
      for (let i = 0; i < lis?.length; i++) {
        lis[i].classList.remove(styles.selected);
      }
    }
    li.currentTarget.classList.add(styles.selected);
  };
  return (
    <div
      className="side-bar"
      style={{
        display: visible ? "block" : "none",
        backgroundColor: colors[0],
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      {options.length === 0 && <Loader size={30} colors={colors} />}
      {options.length !== 0 && (
        <div className={styles.ulContainer}>
          <ul ref={ul} className={styles.ul}>
            <li
              className={[styles.li, styles.selected].join(" ")}
              onClick={(li) =>
                clicked("4,51,3,5,10,2,40,14,7,11,83,59,1,15,6,19,28,34,17", li)
              }
            >
              <img
                src="https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg"
                alt=""
                className={styles.image}
              />
              <span className={styles.span}>All</span>
            </li>
            {options.map((option) => (
              <li
                key={option.id}
                className={styles.li}
                onClick={(li) => clicked(option.id.toString(), li)}
              >
                <img
                  src={option.image_background}
                  alt={option.name + " image"}
                  className={styles.image}
                />
                <span className={styles.span}>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
