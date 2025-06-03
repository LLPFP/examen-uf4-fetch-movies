"use client";

import { useEffect } from "react";
import { useMovies } from "@/contexts/movies-context";
import PeliculasCard from "@/misComponentes/Peliculas";

import { useState } from "react";
import SearchBar from "@/misComponentes/search-bar";

const BASE_URL = "https://api.themoviedb.org/3";

export default function HomePage() {
  const { movies, loading, error, setMovies, setLoading, setError } =
    useMovies();
  const [selectedTab, setSelectedTab] = useState("Populares");

  const TOKEN =
    process.env.NEXT_PUBLIC_TMDB_TOKEN ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjA4ODYyMGRkOTE1NzQxMjgzNWJhNDJlOWIyODMzZSIsIm5iZiI6MTc0ODg5NDI3OS4zMDA5OTk5LCJzdWIiOiI2ODNlMDI0N2YxZGM2NzI3N2JmZGI4MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mJfS3FoMgoi1q6oXlwmz1ZKoLIfRPhCxm_J5gVbT0W4";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?language=es-ES`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar películas populares");
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

    fetchPopularMovies();
  }, [setMovies, setLoading, setError]);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Movie Explorer</h1>

        <div className="mb-4 flex justify-center items-center space-x-4">
          <div className="inline-flex rounded-md shadow-sm bg-gray-900 p-1 w-full max-w-md">
            <button
              className={`w-1/2 px-4 py-2 rounded-l-md focus:outline-none ${
                selectedTab === "Populares"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedTab("Populares")}
              type="button">
              Populares
            </button>
            <button
              className={`w-1/2 px-4 py-2 rounded-r-md focus:outline-none ${
                selectedTab === "Favoritas"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedTab("Favoritas")}
              type="button">
              Favoritas
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Cargando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border border-gray-200 p-4 rounded-lg">
            <h2 className="col-span-full text-4xl font-semibold mb-4">
              Películas Populares
            </h2>

            {/* <-- posible searchbar --> */}

            <div className="col-span-full mb-4 flex justify-start">
              <div className="w-full max-w-xs">
                <SearchBar />
              </div>
            </div>

            {movies.map((movie) => (
              <PeliculasCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!loading && movies.length === 0 && !error && (
          <p className="text-center text-gray-500 py-8">
            No se encontraron resultados
          </p>
        )}
      </div>
    </div>
  );
}
