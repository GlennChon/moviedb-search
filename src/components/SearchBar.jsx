import React from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";
import "./searchbar.css";
export const SearchBar = ({
  id,
  name,
  handleChange,
  handleSubmit,
  value,
  placeholder,
  inputRef,
  onBlur
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          className="input"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          aria-label="search bar"
          onChange={handleChange}
          onBlur={onBlur}
          ref={inputRef}
        />
        <InputGroup.Append>
          <Button onClick={handleSubmit}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
