import React from "react";

const Loader = ({ minHeight = "min-h-[60vh]", message = "LOADING..." }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center bg-zinc-50 ${minHeight}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Minimalist Square Spinner */}
        <div className="w-8 h-8 rounded-none border-2 border-zinc-200 border-t-zinc-900 animate-spin"></div>
        
        {/* Pulsing Loading Text */}
        <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loader;
