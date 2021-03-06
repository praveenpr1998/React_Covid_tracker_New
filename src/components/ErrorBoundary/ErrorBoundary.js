import React, { Component } from "react";
import "./ErrorBoundary.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="ErrorBoundary">
          <div className="red-text">Please check console for error.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
