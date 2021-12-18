import React from "react";
import "./Loader.scss";

function Loader(props) {
  const { title, loading } = props;

  return loading ? (
    <div className="Loader">
      <div className="loading-spinner"></div>
      <span className="loading-text">{title || "Loading..."}</span>
    </div>
  ) : (
    props.children
  );
}

export default Loader;
