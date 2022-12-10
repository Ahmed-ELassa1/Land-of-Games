import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CategoriesContext = createContext("");


export default function CategoriesContextProvider(props) {
  let [games, setGames] = useState([]);
  let [ page , setPage] = useState(20)

  let [categoriesLink, setCategoriesLink] = useState("");
  function CategoriesLists(e) {
   return setCategoriesLink(e.target.innerText);
  }
  function loadMore(e){
    
    setPage(e = page + 20)
    games.splice(20, page);

  }
 useEffect(() => {
   getGamesData(categoriesLink,page);
 }, [categoriesLink, page]);

  async function getGamesData(categoriesLink) {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: {category:`${categoriesLink}`},
      headers: { 
        "X-RapidAPI-Key": "de13fbe6afmsh513dee0bbc1519fp13835ejsnb4bd17b8f24b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      options
    );
    setGames(response.data.splice(0 ,page));
  }


  return (
    <CategoriesContext.Provider
      value={{  categoriesLink, games ,loadMore,setCategoriesLink,CategoriesLists}}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
}




