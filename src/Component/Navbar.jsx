import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-neutral-950 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-yellow-400">🎬 MovieApp</h1>
      
      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link to="/" className="hover:text-rose-200 transition-colors">Home</Link>
        <Link to="/watchlist" className="hover:text-rose-200 transition-colors">WatchList</Link>
      </div>
    </nav>
  );
}

export default Navbar;