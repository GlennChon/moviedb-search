import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export const SearchBar = ({
  id,
  name,
  handleChange,
  handleSubmit,
  value,
  placeholder
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          aria-label="search bar"
          onChange={handleChange}
        />
        <InputGroup.Append>
          <Button onClick={handleSubmit}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
