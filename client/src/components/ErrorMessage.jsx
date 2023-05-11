import React from "react";

export function ErrorMessage(props) {
  const errors = props.errors;
  const errorsList = errors.map((error, index) => <li key={index.toString()}>{error.msg}</li>);
  
  return (
    <ul>{errorsList}</ul>
  );
};