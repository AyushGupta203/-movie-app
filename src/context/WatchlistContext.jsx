import React, { createContext, useState } from "react";

export const Context = createContext(null);

function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // Add movie if it doesn't already exist in the watchlist
  const addToWatchlist = (movie) => {
    const exists = watchlist.find(m => m.imdbID === movie.imdbID);
    if (exists) return;
    setWatchlist(prev => [...prev, movie]);
  };

  // Remove a movie by its IMDB ID
  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(m => m.imdbID !== id));
  };

  return (
    <Context.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </Context.Provider>
  );
}

export default WatchlistProvider;