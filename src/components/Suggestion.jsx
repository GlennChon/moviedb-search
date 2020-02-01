import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./suggestion.css";

const Suggestion = ({ imagePath, title, rating, release }) => {
  return (
    <Container>
      <Row>
        <Col sm={2}>
          <Image
            className="image-container"
            src={imagePath}
            alt={title}
            rounded
          />
        </Col>
        <Col sm={10}>
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
    </Container>
  );
};

export default Suggestion;
