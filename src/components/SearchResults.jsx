import React from "react";
import { MovieCard } from "./MovieCard";
import { Row } from "react-bootstrap";
//TODO: implement infinite scroll

export const SearchResults = ({ results, baseImgPath, handleClick }) => {
  return (
    <Row className="justify-content-sm-center">
      {results.map((movie, i) => (
        <MovieCard
          key={i}
          movie={movie}
          imgPath={baseImgPath + movie.poster_path}
          handleClick={handleClick}
        />
      ))}
    </Row>
  );
};
