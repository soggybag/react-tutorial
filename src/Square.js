/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { PropTypes } from 'prop-types';
import './index.css';

function Square(props) {
  const { onClick, value } = props
  return (
    <button className="square" onClick={onClick} type="button">
      {props.value}
    </button>
  );
}

export default Square

Square.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}