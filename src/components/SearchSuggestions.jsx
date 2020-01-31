import React from "react";
import Suggestion from "./Suggestion";
import { Button } from "react-bootstrap";

export const SearchSuggestions = ({ targetBaseUrl, values }) => {
  const handleClick = () => {};
  return (
    <React.Fragment>
      {values.map((movie, i) => (
        <Suggestion
          key={i}
          title={movie.title}
          onClick={handleClick(movie.id)}
          imagePath={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          rating={movie.vote_average}
          release={movie.release_date}
          as={Button}
        />
      ))}
    </React.Fragment>
  );
};
