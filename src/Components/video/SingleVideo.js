import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import axios from "../../utils/axios";
import "./video.css";
// import { ScaleLoader } from "react-spinners";
import { ScaleLoader } from "react-spinners";
export default function SingleVideo() {
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const APIKey = "ada6e4c7b4f1f5b110a217a26add93a2";
  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 1, // Change this to 1 for autoplay
    },
  };

  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/movie/${movieId}?api_key=${APIKey}&language=en-US` // Replace with your actual API key
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  const trailerSetter = async (title) => {
    setLoading(true);
    try {
      const url = await movieTrailer(title);
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    } catch (error) {
      console.log("Trailer not available");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  useEffect(() => {
    if (movie) {
      trailerSetter(movie.title);
    }
  }, [movie]); // Run this effect when the movie changes

  return (
    <div>
      {trailerUrl ? (
        <div className="available">
          <div className="load">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>

          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      ) : (
        <div className="not-available">
          <h1 className="title">The Movie Trailer is not available for now</h1>
          <h1>{movie?.title}</h1>
          <p>{movie?.overview}</p>
        </div>
      )}
    </div>
  );
}
