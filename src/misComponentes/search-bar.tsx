"use client";

import type React from "react";

import { useState } from "react";
import { useMovies } from "@/contexts/movies-context";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjA4ODYyMGRkOTE1NzQxMjgzNWJhNDJlOWIyODMzZSIsIm5iZiI6MTc0ODg5NDI3OS4zMDA5OTk5LCJzdWIiOiI2ODNlMDI0N2YxZGM2NzI3N2JmZGI4MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mJfS3FoMgoi1q6oXlwmz1ZKoLIfRPhCxm_J5gVbT0W4";
const BASE_URL = "https://api.themoviedb.org/3";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { setMovies, setLoading, setError } = useMovies();

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar películas");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas y series..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
