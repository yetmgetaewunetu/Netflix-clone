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

  const APIKey = process.env.REACT_APP_API_KEY;
  // console.log(id);
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
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}`
        );
        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const result = await response.json();
        console.log(typeof result);
        setMovie(result);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        // setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails(id);
  }, [id, APIKey]);

  useEffect(() => {
    if (movie) {
      // console.log("movie available");
      const trailerSetter = async (title) => {
        setLoading(true);

        try {
          const videoResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKey}`
          );
          if (!videoResponse.ok) throw new Error("Failed to fetch trailer");
          const videoData = await videoResponse.json();
          console.log("🚀 ~ trailerSetter ~ videoData:", videoData);

          const trailer = videoData.results?.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );

          setTrailerUrl(
            trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : ""
          );
        } catch (error) {
          console.error("Error fetching the trailer:", error);

          setTrailerUrl("");
        } finally {
          setLoading(false);
        }
      };
      trailerSetter(movie.title || movie.name || movie.original_name);
    }
  }, [APIKey, id, movie]);
  console.log(trailerUrl, movie);
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
