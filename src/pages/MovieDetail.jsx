import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '5a733bd7';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details when the component mounts or ID changes
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-yellow-400 tracking-widest uppercase text-sm">Please wait...</p>
      </div>
    </div>
  );

  const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          
          <div className="md:w-72 flex-shrink-0">
            <img
              src={posterSrc}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center gap-4">
            <h1 className="text-2xl font-bold text-white leading-tight">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm">
                ⭐ {movie.imdbRating}
              </span>
              <span className="text-gray-400 text-sm">{movie.Year}</span>
              <span className="text-gray-400 text-sm">{movie.Runtime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(',').map((g) => (
                <span key={g} className="bg-gray-800 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-400/30">
                  {g.trim()}
                </span>
              ))}
            </div>
            
            <div className="border-t border-gray-700"></div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Plot</p>
              <p className="text-gray-300 text-sm leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Director</p>
                <p className="text-white font-semibold text-sm">{movie.Director}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Cast</p>
                <p className="text-white font-semibold text-sm">{movie.Actors}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;