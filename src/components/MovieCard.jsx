import React from "react";
import { Card } from "react-bootstrap";
import "./moviecard.css";

export const MovieCard = ({ imgPath, title }) => {
  return (
    <Card className="bg-dark movie-card">
      <Card.Img src={imgPath} alt={`${title} Poster`} className="card-image" />
    </Card>
  );
};
