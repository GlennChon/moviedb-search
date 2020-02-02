import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { MovieDetails } from "./components/MovieDetails";
import { Overlay, Container, Row, Col } from "react-bootstrap";
import { getSearchResults, getMovieDetails } from "./services/moviedbService";
import SearchSuggestions from "./components/SearchSuggestions";
import useDebounce from "./services/debounce";
import InfiniteScroll from "react-infinite-scroll-component";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [val, setVal] = useState("");
  const [valChanged, setValChanged] = useState(false);
  //conditional movieDetail or searchResults view
  const [view, setView] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState({});
  const [movieData, setMovieData] = useState();
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  // used for tv/movie/people/multi search
  // const [checkedValues, setCheckedValues] = useState([]);
  const [searchType, setSearchType] = useState("movie");
  const target = useRef(null);
  const debounceSearchVal = useDebounce(val, 300);
  //keeps track of where the user came from to get to movie details
  const [fromSearch, setFromSearch] = useState(false);

  useEffect(() => {
    if (debounceSearchVal && val.length > 0) {
      getSearchResults(val, searchType).then(res => {
        setSuggestions(res);
      });
    } else {
      setSuggestions({});
    }
  }, [debounceSearchVal, val, searchType]);

  const fetchMoreMovies = async () => {
    const nextPage = data.page + 1;
    if (nextPage < data.total_pages) {
      setHasMoreMovies(true);
      let newResponse = await getSearchResults(val, searchType, nextPage);
      let newData = {
        total_pages: newResponse.total_pages,
        total_results: newResponse.total_results,
        page: newResponse.page,
        results: [...data.results, ...newResponse.results]
      };
      return setData(newData);
    } else {
      return setHasMoreMovies(false);
    }
  };

  const handleChange = e => {
    setValChanged(true);
    setVal(e.target.value);
  };

  const handleSubmit = async (e, val) => {
    e.preventDefault();
    if (val.length === 0) {
      setData({});
      setView("");
    } else {
      setFromSearch(true);
      setData(await getSearchResults(val, searchType));
      setView("searchResults");
    }
    setValChanged(false);
  };

  const handleMovieClick = async (e, movie) => {
    e.preventDefault();
    setMovieData(await getMovieDetails(movie.id));
    setValChanged(false);
    setVal(movie.title);
    setView("movieDetails");
  };

  return (
    <Container className="App">
      <Row className="justify-content-sm-center">
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
                    handleClick={handleMovieClick}
                    baseImgPath="https://image.tmdb.org/t/p/original"
                    size={5}
                    results={
                      suggestions.results !== undefined
                        ? suggestions.results
                        : []
                    }
                  />
                )}
              </Col>
            )}
          </Overlay>
        </Col>
      </Row>
      {view === "searchResults" && (
        <InfiniteScroll
          className="no-overflow"
          dataLength={data.results !== undefined ? data.results.length : 0}
          next={fetchMoreMovies}
          hasMore={hasMoreMovies}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Nothing more to see :(</b>
            </p>
          }
        >
          <Row className="results no-overflow">
            <SearchResults
              baseImgPath="https://image.tmdb.org/t/p/original"
              results={data.results !== undefined ? data.results : []}
              handleClick={handleMovieClick}
            />
          </Row>
        </InfiniteScroll>
      )}
      {view === "movieDetails" && (
        <Row className="justify-content-sm-center">
          <Col>
            <MovieDetails
              movie={movieData}
              baseImgPath="https://image.tmdb.org/t/p/original"
              setView={setView}
              fromSearch={fromSearch}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;

/*
  const handleCheckChange = e => {
    // the multi search function includes tv, movies, ands people.
    // need conditional sliders or radio, below code will not work for that.
    let tmpArray = [...checkedValues];
    if (tmpArray.includes(e.target.id)) {
      let index = tmpArray.indexOf(e.target.id);
      tmpArray.splice(index, 1);
    } else {
      tmpArray.push(e.target.id);
    }
    // sets type for search url creation
    setCheckedValues([...tmpArray]);
    switch (tmpArray.length) {
      case 1:
        setSearchType(tmpArray[0]);
        break;
      default:
        //0 or 2 causes multi
        setSearchType("multi");
    }
    console.log(checkedValues + " " + searchType);
    return;
  };
          //optional filter for movies, tv or people
           <Form>
            <h5>Filter</h5>
            <Form.Check
              inline
              type="checkbox"
              onChange={e => {
                handleCheckChange(e);
              }}
              id="movie"
              label="Movies"
              checked={checkedValues.includes("movie")}
            />
            <Form.Check
              inline
              type="checkbox"
              onChange={e => {
                handleCheckChange(e);
              }}
              id="tv"
              label="TV"
              checked={checkedValues.includes("tv")}
            /><Form.Check
              inline
              type="checkbox"
              onChange={e => {
                handleCheckChange(e);
              }}
              id="people"
              label="people"
              checked={checkedValues.includes("movie")}
            />
          </Form>
          */
