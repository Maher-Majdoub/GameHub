import GamesDisplayer from "./assets/components/gamesDisplayer/GamesDisplayer";
import Header from "./assets/components/header/Header";
import SideBar from "./assets/components/sideBar/SideBar";
import apiService, { CanceledError } from "./services/api-service";
import "./App.css";
import React, { useEffect, useState } from "react";
import { GameProps } from "./interfaces";
import DisplayMoreButton from "./assets/components/displayMoreButton/DisplayMoreButton";

async function getGames(
  parent_platforms: number,
  order: string,
  genre: string,
  search: string
): Promise<GameProps[]> {
  try {
    const { request } = await apiService.getAllGames({
      page: page,
      parent_platforms: parent_platforms,
      ordering: order,
      genres: genre,
      search: search,
    });
    page++;
    const data = (await request).data;
    if (!data.next) morePages = false;
    return data.results;
  } catch (err) {
    return [];
  }
}
async function updateGames(
  games: GameProps[],
  setGames: React.Dispatch<React.SetStateAction<GameProps[]>>,
  parent_platforms: number,
  order: string,
  genre: string,
  search: string
) {
  if (!morePages) return;
  setGames([
    ...games,
    ...(await getGames(parent_platforms, order, genre, search)),
  ]);
}

let page = 1;
let morePages = true;
let parent_platforms = 1;
let genre = "4,51,3,5,10,2,40,14,7,11,83,59,1,15,6,19,28,34,17";
let ordering = "-metacritic";
let search = "";

const darkModeColors = ["#101011", "#222225", "#43434b", "#7b7b89", "#dfdfdf"];
const lightModeColors = ["#fafafa", "#e4e5f1", "#d2d3db", "#484b6a", "#000"];

function App() {
  const [colors, setColors] = useState(darkModeColors);

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const { request, cancel } = apiService.getAllGenres();
    request
      .then((res) => {
        setGenres(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });
    return () => cancel();
  }, []);
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    updateGames([], setGames, parent_platforms, ordering, genre, search);
  }, []);

  const [sideBarVisible, setSideBarVisible] = useState(true);
  document.getElementsByTagName(
    "body"
  )[0].style.cssText = `color: ${colors[4]}; background-color: ${colors[0]}`;
  return (
    <div>
      <Header
        onSideBarOpenerClicked={() => setSideBarVisible(!sideBarVisible)}
        onInputChange={(text) => (search = text)}
        onSearch={(text) => {
          page = 1;
          morePages = true;
          search = text;
          updateGames([], setGames, parent_platforms, ordering, genre, search);
        }}
        colors={colors}
        onModeChanged={(val) =>
          setColors(val ? lightModeColors : darkModeColors)
        }
      />
      <main>
        <SideBar
          title="Genres"
          options={genres}
          colors={colors}
          onClick={(id) => {
            genre = id;
            page = 1;
            updateGames(
              [],
              setGames,
              parent_platforms,
              ordering,
              genre,
              search
            );
            setSideBarVisible(false);
          }}
          className="side-bar1"
          visible={sideBarVisible}
        />
        <div className="mainContent">
          <GamesDisplayer
            title="Games"
            games={games}
            colors={colors}
            onPlatfromsChanged={(platfrom) => {
              page = 1;
              parent_platforms = platfrom;
              updateGames(
                [],
                setGames,
                parent_platforms,
                ordering,
                genre,
                search
              );
            }}
            onOrderChanged={(order) => {
              page = 1;
              ordering = order;
              updateGames(
                [],
                setGames,
                parent_platforms,
                ordering,
                genre,
                search
              );
            }}
          />
          <DisplayMoreButton
            className={[!morePages && "hiden", ""].join(" ")}
            onClick={() => {
              updateGames(
                games,
                setGames,
                parent_platforms,
                ordering,
                genre,
                search
              );
            }}
            colors={colors}
          ></DisplayMoreButton>
        </div>
      </main>
    </div>
  );
}

export default App;
