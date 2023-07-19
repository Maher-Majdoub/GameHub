import Game from "../game/Game";
import { GameProps } from "../../../interfaces";
import styles from "./GamesDisplayer.module.css";
import { useRef } from "react";

interface Props {
  title: string;
  games: GameProps[];
  onPlatfromsChanged(platform: number): void;
  onOrderChanged(order: string): void;
  colors: string[];
}

const GamesDisplayer = ({
  title,
  games,
  onPlatfromsChanged,
  onOrderChanged,
  colors,
}: Props) => {
  let gameCount = 0;
  const platform = useRef<HTMLSelectElement>(null);
  const order = useRef<HTMLSelectElement>(null);
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div>
        <select
          ref={platform}
          name="Platforms"
          className={styles.filterSelect}
          style={{ color: colors[4], backgroundColor: colors[2] }}
          onChange={() =>
            onPlatfromsChanged(
              platform.current ? Number.parseInt(platform.current.value) : 0
            )
          }
        >
          <option value={1}>PC</option>
          <option value={2}>PlayStation</option>
          <option value={3}>Xbox</option>
          <option value={4}>iOS</option>
          <option value={5}>Apple Macintosh</option>
          <option value={6}>Linux</option>
          <option value={7}>Nintendo</option>
          <option value={8}>Android</option>
        </select>
        <select
          ref={order}
          name="orderBy"
          className={styles.filterSelect}
          style={{ color: colors[4], backgroundColor: colors[2] }}
          onChange={() =>
            onOrderChanged(order.current ? order.current.value : "")
          }
          defaultValue={"-metacritic"}
        >
          <option value="-metacritic">Popularity</option>
          <option value="name">Name</option>
          <option value="-rating">Average Rating</option>
          <option value="-relevance">Relevance</option>
          <option value="-created">Create Date</option>
          <option value="-released">Release Date</option>
        </select>
      </div>
      <div className={styles.cards}>
        {games.map((game) => {
          return (
            <Game
              id={game.id}
              background_image={game.background_image}
              parent_platforms={game.parent_platforms}
              name={game.name}
              rating={game.rating}
              ratings={game.ratings}
              released={game.released}
              genres={game.genres}
              metacritic={game.metacritic}
              playtime={game.playtime}
              key={++gameCount}
              colors={colors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GamesDisplayer;
