import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Main.css";
import { Link } from "react-router-dom";
export default function Main() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchActionMovies);

        // Randomly select a movie from the results
        const fetched =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie(fetched);
      } catch (error) {
        console.error("Error fetching Netflix Originals:", error);
      }
    }

    fetchData();
  }, []);
  console.log(movie.id);
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <Link to={`/single/${movie.id}`}>
            <button className="banner_button play">Play</button>
          </Link>
          <button className="banner_button">My List</button>
        </div>
        {/* <h1 className="movie_description">{truncate(movie?.overview, 150)}</h1> */}
      </div>
      <div className="banner-fader"></div>
    </div>
  );
}
