import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./suggestion.css";

const Suggestion = ({ imagePath, title, rating, release }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={2}>
          <Image className="image-container" src={imagePath} rounded />
        </Col>
        <Col xs={10}>
          <Row>
            <Col>
              <h5>{title}</h5>
            </Col>
          </Row>
          <Row>
            <Col>{"Rating: " + rating}</Col>
            <Col>{"Release: " + release}</Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Suggestion;
