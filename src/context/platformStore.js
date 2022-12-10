import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let PlatformContext = createContext("");

export default function PlatformsContextProvider(props) {
  let [games, setGames] = useState([]);
  // const [displayedGames, setDisplayedGames] = useState([]);
  // let [gamesCount, setGamesCount] = useState(0);
  let [page, setPage] = useState(20);

  let [platformLink, setPlatformLink] = useState("");
  function platformLists(e) {
    return setPlatformLink(e.target.innerText);
  }
  function loadMore(e) {
    setPage((e = page + 20));
    games.splice(20, page);
    // const gamesToDisplay = [...games].splice(gamesCount, 20);
    // setDisplayedGames((prevGames) => [...prevGames, ...gamesToDisplay]);
    // setGamesCount((prevState) => prevState + 20);
  }
  useEffect(() => {
    getGamesData(platformLink) ;
  }, [platformLink,page]);

  async function getGamesData(platformLink) {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: { platform: `${platformLink}` },
      headers: {
        "X-RapidAPI-Key": "de13fbe6afmsh513dee0bbc1519fp13835ejsnb4bd17b8f24b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      options
    );
    setGames(response.data.splice(0,page));
  }

  return (
    <PlatformContext.Provider
      value={{ platformLink, games, platformLists, loadMore }}
    >
      {props.children}
    </PlatformContext.Provider>
  );
}
