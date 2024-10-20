import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../utils/axios";
import { Link } from "react-router-dom";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => {
          return (
            <Link to={`/single/${movie.id}`} key={index}>
              <img
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name || movie.title || "Movie poster"}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`} // Fixed the className
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
