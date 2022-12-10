import React, { useEffect, useState } from "react";
import "./GamePage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  let [gameDetail, setGameDetail] = useState(null);
  let [loadinState, setLoadinState] = useState(false);

  useEffect(() => {
    getGamesData(id);
  }, [loadinState]);

  async function getGamesData(gameId) {
    const options = {
      params: { id: `${gameId}` },
      headers: {
        "X-RapidAPI-Key": "de13fbe6afmsh513dee0bbc1519fp13835ejsnb4bd17b8f24b",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/game",
      options
    );
    setLoadinState(false);
    setGameDetail(response.data);
    setLoadinState(true);
  }
  return (
    <>
      {loadinState === false ? (
        <div className="loading-spinner">
          <i className=" fa-solid fa-spinner fa-spin game-loading"></i>
        </div>
      ) : (
        <div className="game-details mb-5">
          <div className="container game-details-container py-4 mt-2 ">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <img
                  src={gameDetail.thumbnail}
                  alt=""
                  className="w-100 rounded-3"
                />
                <div className="mt-3 row px-2">
                  <span className="free-button col-3">free</span>
                  <a
                    className="game-play-page col-9 ms-auto"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.freetogame.com/call-of-duty-warzone"
                  >
                    play now{" "}
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-8 col-sm-12 game-details-list">
                <div className="game-main-description">
                  {" "}
                  <h2>{gameDetail.title}</h2>
                  <h4>About {gameDetail.title}</h4>
                  <p>About {gameDetail.description}</p>
                </div>
                <div className="system-requirements">
                  <h4>minimum system requirements</h4>
                  <p>
                    <span>graphics : </span>
                    {gameDetail.minimum_system_requirements.graphics}
                  </p>
                  <p>
                    <span>os : </span>
                    {gameDetail.minimum_system_requirements.os}
                  </p>
                  <p>
                    <span>processor : </span>
                    {gameDetail.minimum_system_requirements.processor}
                  </p>
                  <p>
                    <span>storage : </span>
                    {gameDetail.minimum_system_requirements.storage}
                  </p>
                </div>
                <div className="game-screenshots">
                  {" "}
                  <h4>{gameDetail.title} Screenshots</h4>
                  <img
                    src={gameDetail.screenshots[0].image}
                    alt=""
                    className="w-100 rounded-3 mt-2"
                  />
                </div>
                <div className="game-information">
                  <h3>additional information</h3>
                  <div className="row mt-4">
                    <div className="col-4 information-list">
                      <h6>title</h6>
                      <p>{gameDetail.title}</p>
                    </div>
                    <div className="col-4 information-list">
                      <h6>developer</h6>
                      <p>{gameDetail.developer}</p>
                    </div>
                    <div className="col-4 information-list">
                      <h6>publisher</h6>
                      <p>{gameDetail.publisher}</p>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-4 information-list">
                      <h6>release date</h6>
                      <p>{gameDetail.release_date}</p>
                    </div>
                    <div className="col-4 information-list">
                      <h6>genre</h6>
                      <p>{gameDetail.genre}</p>
                    </div>
                    <div className="col-4 information-list">
                      <h6>platform</h6>
                      <p>{gameDetail.platform}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
