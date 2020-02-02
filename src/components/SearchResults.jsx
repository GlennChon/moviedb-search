import React from "react";
import { MovieCard } from "./MovieCard";
import { Col } from "react-bootstrap";
//TODO: implement infinite scroll

export const SearchResults = ({ results, baseImgPath, handleClick }) => {
  const style = {
    margin: "auto"
  };
  return (
    <>
      {results.map((movie, i) => (
        <Col xs="auto">
          <MovieCard
            style={style}
            key={i}
            movie={movie}
            imgPath={baseImgPath + movie.poster_path}
            handleClick={handleClick}
          />
        </Col>
      ))}
    </>
  );
};
