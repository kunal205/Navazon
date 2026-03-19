import React from "react";
import { useLocation } from "react-router-dom";
import Products from "./Products.jsx";

const Search = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const searchTerm = location.state?.searchTerm || "";

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-20">
      <div className="flex items-center justify-between mb-12 border-b border-black/10 pb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {searchTerm ? (
            results.length > 0 
              ? `Search Results for "${searchTerm}" (${results.length})` 
              : `No results found for "${searchTerm}"`
          ) : (
            "Explore All Products"
          )}
        </h2>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {results.map((elm, ind) => (
            <Products key={ind} elm={elm} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <p className="text-lg">Try adjusting your search or browse our categories.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
