import React, { useContext } from "react";
import { Context } from '../context/WatchlistContext';

function WatchList() {
  const { watchlist, removeFromWatchlist } = useContext(Context);

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Watchlist</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchlist.map(movie => (
          <div 
            key={movie.imdbID}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full cursor-pointer"
          >
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full h-64 object-cover" 
            />
            
            <div className="p-3 flex-grow">
              <p className="text-white font-bold text-sm leading-tight line-clamp-2">
                {movie.Title}
              </p>
            </div>
            
            <div className="px-3 pb-3 mt-auto">
              <button 
                className="w-full bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors" 
                onClick={() => removeFromWatchlist(movie.imdbID)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;