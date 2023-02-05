import { useState, useEffect } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
const API_KEY1 = process.env.REACT_APP_API_KEY;
const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY1}`;

// const movie1 = {
//   Title: "Captain Marvel",
//   Year: "2019",
//   imdbID: "tt4154664",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
// };
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState(``);

  useEffect(() => {
    searchmovies("Batman");
  }, []);
  const searchmovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // console.log(data.Search);
  };

  return (
    <div className="app">
      <h1> Cineflicks </h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchmovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
