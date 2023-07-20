import { BsSearch } from "react-icons/bs";
import ToggleButton from "../toggleButton/ToggleButton";
import styles from "./Header.module.css";
import { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { PiGameController } from "react-icons/pi";

interface Props {
  onSideBarOpenerClicked(): void;
  onInputChange(text: string): void;
  onSearch(text: string): void;
  colors: string[];
  onModeChanged(val: boolean): void;
}

const Header = ({
  onSideBarOpenerClicked,
  onInputChange,
  onSearch,
  colors,
  onModeChanged,
}: Props) => {
  const inputField = useRef<HTMLInputElement>(null);
  return (
    <header className={styles.header} style={{ backgroundColor: colors[0] }}>
      <div className={styles.sideBarOpener} onClick={onSideBarOpenerClicked}>
        <FiMenu />
      </div>
      <div className={styles.icon} onClick={() => window.location.reload()}>
        <PiGameController />
      </div>
      <div className={styles.searchBar} style={{ backgroundColor: colors[1] }}>
        <div
          className={styles.searchIconContainer}
          style={{ color: colors[4] }}
          onClick={() => {
            onSearch(inputField.current ? inputField.current.value : "");
          }}
        >
          <BsSearch className={styles.searchIcon} />
        </div>
        <input
          ref={inputField}
          name="search"
          type="text"
          placeholder="Search Game..."
          onChange={() => {
            onInputChange(inputField.current ? inputField.current.value : "");
          }}
          onKeyDown={(key) => {
            if (key.code === "Enter") {
              onSearch(inputField.current ? inputField.current.value : "");
              if (inputField.current) inputField.current.value = "";
              onInputChange("");
            }
          }}
          className={styles.input}
          style={{ color: colors[4] }}
        />
      </div>
      <ToggleButton onModeChanged={onModeChanged}></ToggleButton>
    </header>
  );
};

export default Header;
