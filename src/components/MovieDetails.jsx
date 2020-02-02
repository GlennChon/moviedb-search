import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
//imdb_url: `https://www.imdb.com/title/${imdb_d}`
export const MovieDetails = ({ movie, baseImgPath, fromSearch, setView }) => {
  const [mainImgPath, setMainImgPath] = useState(
    baseImgPath + movie.poster_path
  );
  useEffect(() => {
    if (movie.backdrop_path !== null) {
      let newPath = baseImgPath + movie.backdrop_path;
      setMainImgPath(newPath);
    }
  }, [baseImgPath, movie.backdrop_path]);

  // Same file css example
  const style = {
    jumbotron: {
      height: "175%",
      backgroundImage: "url(" + mainImgPath + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      position: "relative",
      padding: "0"
    },
    container: {
      marginTop: "2%",
      width: "100%",
      height: "auto",
      padding: "0"
    },
    topContainer: {
      alignContent: "top",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      margin: "0",
      paddingTop: "2%",
      color: "black"
    },
    bottomContainer: {
      position: "absolute",
      bottom: "0",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      margin: "0",
      paddingBottom: "1%",
      paddingTop: "1%"
    },
    left: {
      textAlign: "left",
      alignContent: "left"
    },
    right: { textAlign: "right", alignContent: "right" },
    poster: {
      width: "180px",
      height: "300px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%"
    }
  };

  const checkUndefined = val => {
    return val === undefined || val === null ? "N/A" : val;
  };
  return (
    <>
      <Button
        onClick={() => {
          if (fromSearch) {
            setView("searchResults");
          } else {
            setView("");
          }
        }}
      >
        Back
      </Button>
      <Jumbotron fluid style={style.jumbotron} alt={movie.title + " Cover"}>
        <Container style={style.container}>
          <Row style={style.topContainer}>
            <Col style={style.left}>
              <h1>{movie.title}</h1>
              <h5>{checkUndefined(movie.tagline)}</h5>
            </Col>
            <Col style={style.right}>
              <h6>{"Rating: " + checkUndefined(movie.vote_average)}</h6>
              <h6>{"Released: " + checkUndefined(movie.release_date)}</h6>
              <h6>{"Genres: " + movie.genres.map(genre => genre.name)}</h6>
            </Col>
          </Row>
          <Row style={style.bottomContainer}>
            <Col style={style.left}>
              <h5>{checkUndefined(movie.overview)}</h5>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row style={style.left}>
          <Col>
            {movie.homepage !== null && (
              <h4>
                HomePage:
                <a href={movie.homepage}>{" " + checkUndefined(movie.title)}</a>
              </h4>
            )}
            {movie.imdb_id !== null && (
              <h4>
                IMDB:
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
                  {" " + checkUndefined(movie.title)}
                </a>
              </h4>
            )}
            <h4>
              Language:
              {" " + checkUndefined(movie.original_language).toUpperCase()}
            </h4>
            <h4>
              Production:
              {" " + movie.production_companies.map(company => company.name)}
            </h4>
            <h4>
              Countries:
              {" " + movie.production_countries.map(country => country.name)}
            </h4>
            <h4>
              Budget:
              {" " + checkUndefined(movie.budget)}
            </h4>
          </Col>
          <Col style={style.right}>
            <Image
              style={style.poster}
              src={baseImgPath + movie.poster_path}
              rounded
              alt={movie.title + " Poster"}
            />
          </Col>
        </Row>
        ;
      </Container>
    </>
  );
};
