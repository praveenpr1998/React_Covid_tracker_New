import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header pl5">
      <ErrorBoundary>
        <Link to="/" className="logo-text">
          Covid Tracker - India
        </Link>
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(Header);
