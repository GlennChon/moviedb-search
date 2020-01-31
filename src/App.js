import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { Overlay, Container, Row, Col } from "react-bootstrap";
import { getSearchResults, getMovieDetails } from "./services/moviedbService";
import SearchSuggestions from "./components/SearchSuggestions";
import useDebounce from "./services/debounce";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [val, setVal] = useState("");
  const [valChanged, setValChanged] = useState(false);
  const [view, setView] = useState("main");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState({});
  const target = useRef(null);
  const debounceSearchVal = useDebounce(val, 300);

  useEffect(() => {
    if (debounceSearchVal) {
      getSearchResults(val).then(res => {
        setSuggestions(res);
      });
    } else {
      setSuggestions({});
    }
  }, [debounceSearchVal]);

  const handleChange = e => {
    setValChanged(true);
    setVal(e.target.value);
  };

  const handleSubmit = async (e, val) => {
    e.preventDefault();
    if (val.length == 0) {
      setResults({});
    } else {
      setResults(await getSearchResults(val));
      setView("main");
    }
    setValChanged(false);
  };

  const handleSuggestionClick = async (e, movie) => {
    console.log(movie.id + " clicked");
    e.preventDefault();
    setValChanged(false);
    setVal(movie.title);
    setView("detail");
    setResults(await getMovieDetails(movie.id));
  };

  return (
    <Container fluid="md" className="App">
      <Row className="justify-content-md-center">
        <Col>
          <h1>Search The Movie DB</h1>
          <SearchBar
            id="movie-search"
            name="movie-searchbar"
            handleSubmit={e => {
              handleSubmit(e, val);
            }}
            value={val}
            handleChange={handleChange}
            onBlur={() => {
              setValChanged(false);
            }}
            inputRef={target}
          />
          <Overlay target={target.current} show={valChanged} placement="bottom">
            {({
              placement,
              scheduleUpdate,
              arrowProps,
              outOfBoundaries,
              show,
              ...props
            }) => (
              <Col {...props}>
                {suggestions && (
                  <SearchSuggestions
                    handleClick={handleSuggestionClick}
                    baseImgPath="https://image.tmdb.org/t/p/original"
                    size={5}
                    results={suggestions.results ? suggestions.results : []}
                  />
                )}
              </Col>
            )}
          </Overlay>
          {view === "main" && (
            <SearchResults
              baseImgPath="https://image.tmdb.org/t/p/original"
              results={results.results ? results.results : []}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
