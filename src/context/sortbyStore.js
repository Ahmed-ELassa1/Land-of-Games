import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let SortbyContext = createContext("");

export default function SortbysContextProvider(props) {
  let [games, setGames] = useState([]);
  let [ page , setPage] = useState(20)

  let [sortbyLink, setSortbyLink] = useState("");
  function sortbyLists(e) {
   return setSortbyLink(e.target.innerText);
  }
  function loadMore(e){
    
    setPage(e = page + 20)
    games.splice(20, page);

  }
  useEffect(() => {
    getGamesData(sortbyLink, page);
  }, [sortbyLink, page]);
  async function getGamesData(sortbyLink) {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: {"sort-by":`${sortbyLink}`},
      headers: { 
        "X-RapidAPI-Key": "de13fbe6afmsh513dee0bbc1519fp13835ejsnb4bd17b8f24b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      options
    );
    setGames(response.data.splice(0, page));
  }


  return (
    <SortbyContext.Provider
      value={{  sortbyLink, games ,loadMore,setSortbyLink,sortbyLists}}
    >
      {props.children}
    </SortbyContext.Provider>
  );
}
