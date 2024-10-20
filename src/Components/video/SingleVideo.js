import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import axios from "../../utils/axios";
import "./video.css";
import { ScaleLoader } from "react-spinners"; // Loading spinner

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
      autoplay: 1, // Change this to 0 if autoplay should be disabled by default
    },
  };

  // Fetch movie details by ID
  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/movie/${movieId}?api_key=${APIKey}&language=en-US`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  // Fetch the trailer URL using the movie's title
  const trailerSetter = async (title) => {
    setLoading(true);
    try {
      const url = await movieTrailer(title);
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      } else {
        setTrailerUrl(""); // No trailer found
      }
    } catch (error) {
      console.log("Trailer not available");
      setTrailerUrl(""); // Fallback if no trailer is found
    }
    setLoading(false);
  };

  // Fetch movie details on component mount or when `id` changes
  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  // Set the trailer URL when movie details are available
  useEffect(() => {
    if (movie) {
      trailerSetter(movie.title || movie.name || movie.original_name);
    }
  }, [movie]);

  // Loading state while fetching movie details
  if (loading) {
    return (
      <div className="loading">
        <ScaleLoader color="#ffffff" size={150} />
      </div>
    );
  }

  // Render the movie trailer or fallback message
  return (
    <div>
      {trailerUrl ? (
        <div className="available">
          <div className="load">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>

          <div>
            <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
            <p>{movie?.overview}</p>
          </div>
        </div>
      ) : (
        <div className="not-available">
          <h1 className="title">The Movie Trailer is not available for now</h1>
          <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
          <p>{movie?.overview}</p>
        </div>
      )}
    </div>
  );
}
