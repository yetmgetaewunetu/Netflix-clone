import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { ScaleLoader } from "react-spinners";
import "./video.css";

export default function SingleVideo() {
  const { id } = useParams();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  // Using environment variable for API Key
  const APIKey = process.env.REACT_APP_API_KEY;

  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 1,
      loop: 1,
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const result = await response.json();
        setMovie(result);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details."); // Set error state
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails(id);
  }, [id, APIKey]);

  useEffect(() => {
    if (movie) {
      const trailerSetter = async (title) => {
        setLoading(true);
        try {
          const videoResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKey}`
          );
          if (!videoResponse.ok) throw new Error("Failed to fetch trailer");
          const videoData = await videoResponse.json();

          const trailer = videoData.results?.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );

          setTrailerUrl(
            trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : ""
          );
        } catch (error) {
          console.error("Error fetching the trailer:", error);
          setError("Trailer not available."); // Set error state
          setTrailerUrl(""); // Fallback in case of an error
        } finally {
          setLoading(false);
        }
      };
      trailerSetter(movie.title || movie.name || movie.original_name);
    }
  }, [APIKey, id, movie]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "500px",
        }}
        className="loading"
      >
        <ScaleLoader color="red" size={250} />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <div>
      {trailerUrl ? (
        <div className="available">
          <div className="load">
            <YouTube videoId={trailerUrl.split("v=")[1]} opts={opts} />
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
