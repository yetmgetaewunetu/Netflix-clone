import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Main.css";

export default function Main() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

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
  }, []); // Run once on component mount

  // Function to truncate a string and add "..." if it's too long
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        background: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) no-repeat center center/cover`,
        width: "100vw",
        height: "60vh",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="movie_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fader"></div>
    </div>
  );
}
