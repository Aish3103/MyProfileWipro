import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error logged:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{ color: "red" }}>Something went wrong 😢</h3>;
    }

    return this.props.children;
  }
}
