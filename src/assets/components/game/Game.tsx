import styles from "./Game.module.css";
import { GameProps } from "../../../interfaces";
import { useState } from "react";
import {
  BsPlaystation,
  BsWindows,
  BsXbox,
  BsAndroid2,
  BsNintendoSwitch,
  BsApple,
  BsBrowserChrome,
} from "react-icons/bs";
import { SiLinux, SiIos } from "react-icons/si";
import noImage from "./../../images/noImage.png";
const platformsIcons = {
  PC: <BsWindows />,
  PlayStation: <BsPlaystation />,
  Xbox: <BsXbox />,
  Android: <BsAndroid2 />,
  Linux: <SiLinux />,
  Nintendo: <BsNintendoSwitch />,
  "Apple Macintosh": <BsApple />,
  iOS: <SiIos />,
  Web: <BsBrowserChrome />,
};
const ratingIcons = {
  recommended: "👍",
  exceptional: "👌",
  skip: "⏭",
  meh: "😐",
};

const Game = ({
  id,
  background_image,
  parent_platforms,
  name,
  rating,
  ratings,
  released,
  genres,
  metacritic,
  playtime,
  colors,
}: GameProps) => {
  const [hover, setHover] = useState(false);
  const index = background_image ? background_image.indexOf("media/") + 6 : -1;
  background_image = background_image
    ? background_image.slice(0, index) +
      "crop/600/400/" +
      background_image.slice(index)
    : "";
  return (
    <div
      className={styles.cardContainer}
      onClick={() => setHover(!hover)}
      key={id}
    >
      <div className={styles.card} style={{ backgroundColor: colors[1] }}>
        <img
          src={background_image ? background_image : noImage}
          alt={name + "image"}
          className={styles.image}
        />
        <div className={styles.cardContent}>
          <div
            className={styles.globalInfos}
            style={{ backgroundColor: colors[1] }}
          >
            <div className={styles.platformsIcons} style={{ color: colors[4] }}>
              {parent_platforms.map((p) => (
                <span key={p.platform.id} className={styles.platformIcon}>
                  {platformsIcons[p.platform.name]}
                </span>
              ))}
            </div>
            {metacritic && (
              <span
                className={[
                  styles.metacriticValue,
                  metacritic >= 80
                    ? styles.green
                    : metacritic >= 50
                    ? styles.orange
                    : styles.red,
                ].join(" ")}
              >
                {metacritic}
              </span>
            )}
          </div>
          <div className={styles.gameName}>
            <h3>
              {name}
              {ratings[0] && (
                <span title={ratings[0].title}>
                  {ratingIcons[ratings[0].title]}
                </span>
              )}
            </h3>
          </div>
          <div
            className={[styles.gameInfos, hover ? styles.hovered : ""].join(
              " "
            )}
            style={{ backgroundColor: colors[1] }}
          >
            <div className={styles.gameInfo} style={{ borderColor: colors[3] }}>
              <span style={{ color: colors[3] }}>Release Date: </span>
              <span style={{ color: colors[4] }}>{released}</span>
            </div>
            <div className={styles.gameInfo} style={{ borderColor: colors[3] }}>
              <span style={{ color: colors[3] }}>Genres: </span>
              <span style={{ color: colors[4] }}>
                {genres.map((g) => g.name + ",")}
              </span>
            </div>
            <div className={styles.gameInfo} style={{ borderColor: colors[3] }}>
              <span style={{ color: colors[3] }}>Rating: </span>
              <span style={{ color: colors[4] }}>{rating + " / 5"}</span>
            </div>
            <div className={styles.gameInfo}>
              <span style={{ color: colors[3] }}>Play Time: </span>
              <span style={{ color: colors[4] }}>{playtime + " hours"}</span>
            </div>

            <div className={styles.actions}>
              <div
                className={styles.action}
                style={{ backgroundColor: colors[2] }}
              >
                <span>Show more like this</span>
                <span>{">"}</span>
              </div>
              <div
                className={styles.action}
                style={{ backgroundColor: colors[2] }}
              >
                <span>Show more about this game</span>
                <span>{">"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
