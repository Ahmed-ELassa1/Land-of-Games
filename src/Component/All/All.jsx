import React from "react";
import axios from "axios";
import "./All.css";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function All() {
  let [games, setGames] = useState([]);
  // let navigator = useNavigate();
  let page = new Array(20).fill(0).map((el, i) => (el = i * 20));
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
    setGames(response.data.splice(0, 20));
  }

  return (
    <>
      <div className="container all-container">
        <div className="row w-100">
          {games.map((game, i) => (
            <div className="col-md-3 mb-4 column game" key={i}>
              <Link to={`/gameDetails/`+ game.id}>
                <div className="item">
                  <img src={game.thumbnail} alt="" className="w-100" />
                  <div className="item-text row d-flex">
                    <div className="col-12 game-title">
                      <h4>{game.title}</h4>
                      <span className="btn free-btn">free</span>
                    </div>
                    <div className="description">
                      <p>
                        {game.short_description
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")}
                      </p>
                    </div>
                    <div className="icons">
                      <i className="fa-solid fa-square-plus"></i>
                      <div className="d-flex align-item-center">
                        <span className="game-genre">{game.genre}</span>
                        <span>
                          {game.platform === "Web Browser" ? (
                            <i className="platform fa-solid fa-window-maximize"></i>
                          ) : (
                            <i className="platform fa-brands fa-windows"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button id="browes">more games ></button>
      </div>
    </>
  );
}
