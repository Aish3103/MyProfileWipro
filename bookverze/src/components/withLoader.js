import React from "react";

export default function withLoader(Wrapped) {
  return function Loader({ loading, ...props }) {
    if (loading) return <h3>Loading...</h3>;
    return <Wrapped {...props} />;
  };
}
