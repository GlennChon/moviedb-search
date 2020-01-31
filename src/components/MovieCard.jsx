import React from "react";
import { Card } from "react-bootstrap";
import "./moviecard.css";

export const MovieCard = ({ imgPath, title }) => {
  return (
    <div className="movie-card">
      <Card className="bg-dark">
        <Card.Img src={imgPath} alt={`${title} Poster`} />
      </Card>
    </div>
  );
};
