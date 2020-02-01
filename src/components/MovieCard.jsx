import React from "react";
import { Card } from "react-bootstrap";
import "./moviecard.css";

export const MovieCard = ({ imgPath, movie, handleClick }) => {
  return (
    <Card
      role="button"
      name={movie.title + " card"}
      className="btn bg-dark movie-card"
      onClick={e => {
        handleClick(e, movie);
      }}
    >
      <Card.Img
        src={imgPath}
        alt={`${movie.title} Poster`}
        className="card-image"
      />
    </Card>
  );
};
