import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Main.css";
export default function Main() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetch() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        const fetched =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie({ ...fetched });
      } catch (error) {}
    }
    fetch();
  });
  function truncate(str) {
    return str?.slice(0, 150);
  }
  return (
    <div
      className="banner"
      style={{
        background: `url(
          https://image.tmdb.org/t/p/original${movie.backdrop_path}
        )`,
        width: "100vw",
        height: "60vh",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="movie_description">{truncate(movie.overview)}</h1>
      </div>
      <div className="banner-fader"></div>
    </div>
  );
}
