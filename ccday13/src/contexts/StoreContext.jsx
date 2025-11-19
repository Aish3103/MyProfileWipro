import React, { createContext, useContext } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children, stores }) {
  // stores is an object, e.g. { bookStore }
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStores must be used within StoreProvider");
  return ctx;
}
