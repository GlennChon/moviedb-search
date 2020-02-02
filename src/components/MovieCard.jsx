import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./moviecard.css";

export const MovieCard = ({ imgPath, movie, handleClick }) => {
  const [imgClassName, setImgClassName] = useState("card-image");
  const [cardTextClassName, setCardTextClassName] = useState("");
  const handleImgLoad = () => {
    setCardTextClassName("hidden");
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
      <Card.Text className={cardTextClassName}>
        <h1>{movie.title}</h1>
      </Card.Text>
    </Card>
  );
};
