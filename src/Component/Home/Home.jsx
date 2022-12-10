import React from "react";
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Home() {
  let [games, setGames] = useState([]);
  let navigator = useNavigate()
  useEffect(() => {
    getGamesData();
  }, []);

  async function getGamesData() {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "X-RapidAPI-Key": "de13fbe6afmsh513dee0bbc1519fp13835ejsnb4bd17b8f24b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      options
    );
    setGames(response.data.splice(0, 3));
  }


  function browseGames(){

  return  navigator("/all")
  }

  return (
    <>
      <div id="home">
        <div className="startup">
          <div className="container">
            <div className="p-5 text-center ">
              <h1>
                Find & track the best <span className="">free-to-play</span>{" "}
                games!
              </h1>
              <p className="text-muted text-center description">
                Track what you've played and search for what to play next! Plus
                get free premium loot!
              </p>
              <button id="browes" onClick={browseGames}>browse games</button>
            </div>
          </div>
        </div>

        <div className="recommended-games container">
          <div className="d-flex mt-4">
            <i className="fa-solid fa-robot mt-3 me-1 fs-3"></i>
            <h2 className="">personalized recommendations</h2>
          </div>
          <div className="row">
            {games.map((game,i) => (
              <div className="col-md-4 mb-5" key={i}>
                <Link to={`/gameDetails/`+game.id}>
                <div className="item">
                  <img src={game.thumbnail} alt="" className="w-100" />
                  <div className="item-text ">
                    <h4>{game.title}</h4>
                    <span className="btn free-btn">free</span>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
