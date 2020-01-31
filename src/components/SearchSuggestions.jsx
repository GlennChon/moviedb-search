import React from "react";
import Suggestion from "./Suggestion";
import { ListGroup } from "react-bootstrap";
import "./searchSuggestions.css";

const SearchSuggestions = ({ handleClick, baseImgPath, size, results }) => {
  return (
    <ListGroup className="list-group">
      {results.slice(0, size).map((movie, i) => (
        <ListGroup.Item
          className="list-item"
          key={i}
          action
          onClick={e => {
            handleClick(e, movie);
          }}
        >
          <Suggestion
            title={movie.title}
            imagePath={baseImgPath + movie.poster_path}
            rating={movie.vote_average}
            release={movie.release_date}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SearchSuggestions;

/*

      */
