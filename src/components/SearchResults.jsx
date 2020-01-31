import React from "react";
import { MovieCard } from "./MovieCard";
import { Row, Col } from "react-bootstrap";
//TODO: implement infinite scroll

export const SearchResults = ({ results, baseImgPath }) => {
  return (
    <Row>
      {results.map((movie, i) => (
        <Col>
          <MovieCard
            key={i}
            title={movie.title}
            imgPath={baseImgPath + movie.poster_path}
          />
        </Col>
      ))}
    </Row>
  );
};
