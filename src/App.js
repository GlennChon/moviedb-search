import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { Overlay, Row, Col } from "react-bootstrap";
import { getSearchResults, getMovieDetails } from "./services/moviedbService";
import SearchSuggestions from "./components/SearchSuggestions";
import useDebounce from "./services/debounce";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [val, setVal] = useState("");
  const [valChanged, setValChanged] = useState(false);
  const [view, setView] = useState("main");
  const [results, setResults] = useState({});
  const target = useRef(null);
  const debounceSearchVal = useDebounce(val, 500);

  useEffect(() => {
    if (debounceSearchVal) {
      getSearchResults(val).then(results => {
        setResults(results);
      });
    } else {
      setResults({});
    }
  }, [debounceSearchVal]);

  const handleChange = e => {
    setValChanged(true);
    setVal(e.target.value);
  };

  const handleSubmit = async (e, val) => {
    e.preventDefault();
    setValChanged(false);
    setResults(await getSearchResults(val));
  };

  const handleSuggestionClick = async (e, movie) => {
    console.log(movie.id + " clicked");
    e.preventDefault();
    setValChanged(false);
    setVal(movie.title);
    setResults(await getMovieDetails(movie.id));
  };

  return (
    <div className="App">
      <div ref={target}>
        <SearchBar
          id="movie-search"
          name="movie-searchbar"
          handleSubmit={e => {
            handleSubmit(e, val);
          }}
          value={val}
          handleChange={handleChange}
        />
      </div>

      <Overlay
        target={target.current}
        show={valChanged}
        placement="bottom-start"
      >
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show,
          ...props
        }) => (
          <Col {...props}>
            {results.total_results !== 0 &&
              results.total_results !== undefined && (
                <SearchSuggestions
                  handleClick={handleSuggestionClick}
                  baseImgPath="https://image.tmdb.org/t/p/original"
                  size={5}
                  results={results.results ? results.results : []}
                />
              )}
          </Col>
        )}
      </Overlay>
      <h1>Test H1</h1>
    </div>
  );
}

export default App;

/*

          <SearchSuggestions
            {...props}
            handleClick={handleSuggestionClick}
            baseImgPath="https://image.tmdb.org/t/p/original"
            size={5}
            results={results.results ? results.results : []}
          />

      */
