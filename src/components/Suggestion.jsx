import React from "react";
import { Row, Col, Image } from "react-bootstrap";

export const Suggestion = ({ imagePath, title, rating, release }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={2}>
          <Image src={imagePath} rounded />
        </Col>
        <Col xs={10}>
          <Row>
            <Col>{title}</Col>
          </Row>
          <Row>
            <Col>{("Rating:", rating)}</Col>
            <Col>{("Release:", release)}</Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};
