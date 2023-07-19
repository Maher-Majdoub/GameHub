import { ReactNode } from "react";
import styles from "./ToggleButton.module.css";
const ToggleButton = ({
  children = "",
  onModeChanged,
}: {
  children?: ReactNode;
  onModeChanged(val: boolean): void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.toggleSwitch}>
        <label className={styles.Label}>
          <input
            type="checkbox"
            className={styles.input}
            onChange={(ev) => onModeChanged(ev.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      {children && <span className={styles.currentStateText}>{children}</span>}
    </div>
  );
};

export default ToggleButton;
