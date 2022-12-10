import React, { useContext } from "react";
import { CategoriesContext } from "./../../context/CategoriesStore";
import { Link } from 'react-router-dom';

export default function Categories() {
  let { games, loadMore } = useContext(CategoriesContext);
  return (
    <>
      <div className="container all-container">
        <div className="row w-100">
          {games.map((game, i) => (
            <div className="col-md-3 mb-5 column game" key={i}>
              <Link to={`/gameDetails/` + game.id}>
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
        <button id="browes" onClick={loadMore}>
          more games >
        </button>
      </div>
    </>
  );
}
