import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./moviecard.css";

export const MovieCard = ({ imgPath, movie, handleClick }) => {
  const [imgClassName, setImgClassName] = useState("card-image");
  const handleImgLoad = () => {
    setImgClassName("card-image fade-in");
    return;
  };
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
        className={imgClassName}
        onLoad={handleImgLoad}
      />
      <Card.Text className="card-text">
        <h5>{movie.title}</h5>
      </Card.Text>
    </Card>
  );
};
