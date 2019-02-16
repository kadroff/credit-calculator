import React from "react";
import PropTypes from "prop-types";

const DisplayChild = ({ func, text }) => {
  return (
    <span>
      {func} <small>{text}</small>
    </span>
  );
};

DisplayChild.defaultProps = {
  func: () => <p>Missing numeric value</p>,
  text: "No value provided"
};

DisplayChild.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default DisplayChild;
