import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/WatchlistContext';

function MovieCard({ movie }) {
  const { addToWatchlist } = useContext(Context);
  const { imdbID, Poster, Title, Year } = movie;

  // Fallback for missing poster image
  const isValidPoster = Poster !== 'N/A' && Poster !== undefined;
  const posterSrc = isValidPoster ? Poster : 'https://via.placeholder.com/400x500?text=No+Image';

  // Prevent link navigation when adding to watchlist
  const handleAddToWatchlist = (e) => {
    e.preventDefault(); 
    addToWatchlist(movie); 
  };

  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-yellow-400/20 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full">
        
        <img
          src={posterSrc}
          alt={`${Title} poster`}
          className="w-full h-75 object-cover"
        />

        <div className="p-3 flex-grow">
          <h2 className="text-white font-bold text-sm leading-tight line-clamp-2">
            {Title}
          </h2>
          <p className="text-yellow-400 text-xs mt-1 font-semibold">
            {Year}
          </p>
        </div>

        <div className="px-3 pb-3 mt-auto">
          <button 
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 w-full"
            onClick={handleAddToWatchlist}
          >
            + WatchList
          </button>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;