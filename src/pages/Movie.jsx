import React, { useEffect, useState } from "react";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsFilm,
} from "react-icons/bs";

import "./Movie.css";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagLine">{movie.tagline}</p>

          <div className="info">
            <h3>
              <BsWallet2 /> Budget:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info revenue">
            <h3>
              <BsGraphUp /> Revenue:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info duration">
            <h3>
              <BsHourglassSplit /> Duration:
            </h3>
            <p>{movie.runtime} minutes</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Description:
            </h3>
            <p>{movie.overview}</p>
          </div>
          <div className="info">
            <h3>
              <BsFilm /> Genre:
            </h3>
            <p className="genre">
              {movie && movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
