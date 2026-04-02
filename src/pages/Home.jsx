import React, { useState, useEffect } from 'react';
import MovieCard from '../Component/MovieCard';

const API_KEY = '5a733bd7';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch movies from OMDb API
  const fetchMovies = (searchQuery) => {
    setLoading(true);
    const controller = new AbortController();
    
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'False') {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search || []);
          setError(null);
        }
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError("Network Error");
        setLoading(false);
      });

    return () => controller.abort();
  };

  useEffect(() => {
    const popularSearches = ['marvel', 'dc', 'star wars', 'harry potter'];
    const randomQuery = popularSearches[Math.floor(Math.random() * popularSearches.length)];
    const abortFetch = fetchMovies(randomQuery);
    return () => abortFetch && abortFetch();
  }, []);

  if (loading && movies.length === 0) return (
    <div className="bg-gray-950 min-h-screen p-6 flex justify-center items-center">
      <h1 className="text-white text-xl">Loading...</h1>
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      {/* Search Bar */}
      <div className="flex justify-center gap-2 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Movie Name"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg w-80 outline-none border border-gray-600 focus:border-yellow-400"
        />
        <button
          onClick={() => fetchMovies(query)}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-300"
        >
          Search
        </button>
      </div>

      {loading && <h2 className="text-white text-center mb-4">Loading updates...</h2>}
      
      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {error && <h2 className="text-red-400 text-center mt-4"> {error} </h2>}
    </div>
  );
}

export default Home;