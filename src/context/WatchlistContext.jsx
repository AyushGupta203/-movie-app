import React, { createContext, useReducer, useContext } from "react";

export const WatchlistContext = createContext(null);

function watchlistReducer(state, action) {
  switch (action.type) {

    case "ADD": {
      const movie = action.payload;
      const exists = state.some(m => m.imdbID === movie.imdbID);
      if (exists) return state;
      return [...state, movie];
    }

    case "REMOVE": {
      return state.filter(m => m.imdbID !== action.payload);
    }

    case "CLEAR": {
      return [];
    }

    default:
      throw new Error(`unknown action: ${action.type}`);
  }
}

export function WatchlistProvider({ children }) {
  const [watchlist, dispatch] = useReducer(watchlistReducer, []);

  const addToWatchlist = (movie) => {
    dispatch({ type: "ADD", payload: movie });
  };

  const removeFromWatchlist = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const clearWatchlist = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used inside WatchlistProvider");
  }
  return context;
}