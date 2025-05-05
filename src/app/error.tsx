"use client"

import React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[80vh] text-white relative text-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-red-400 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2   bg-blue-600 hover:bg-blue-700 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
