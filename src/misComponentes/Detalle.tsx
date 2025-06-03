"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjA4ODYyMGRkOTE1NzQxMjgzNWJhNDJlOWIyODMzZSIsIm5iZiI6MTc0ODg5NDI3OS4zMDA5OTk5LCJzdWIiOiI2ODNlMDI0N2YxZGM2NzI3N2JmZGI4MjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mJfS3FoMgoi1q6oXlwmz1ZKoLIfRPhCxm_J5gVbT0W4";

const BASE_URL = "https://api.themoviedb.org/3";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

interface DetalleProps {
  id: number;
}

export default function Detalle({ id }: DetalleProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?language=es-ES`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar detalles de la película");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Película no encontrada"}
          </p>
          <Link href="/MovieExplorer" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen w-full text-white">
      <Link
        href="/"
        className=" text-white hover:underline ps-5 pt-2 inline-block text-lg ">
        ←
      </Link>
      <div className="w-full px-0 py-8">
        {/* Banner de la película */}
        {movie.backdrop_path && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-opacity-50"></div>
          </div>
        )}
        <h1 className="ps-5 pt-5 text-3xl font-bold mb-4 text-white">
          {movie.title}
        </h1>

        <button className="bg-black text-white rounded-2xl border border-white p-2 transition-colors ms-5 shadow-lg hover:bg-white hover:text-black">
          <Link href="/MovieExplorer">★ Añadir a favoritos</Link>
        </button>
        <button className="bg-black text-white px-4 py-2  rounded-2xl border border-white p-2  transition-colors ms-5">
          <Link href="/MovieExplorer">Ver trailer</Link>
        </button>

        <div className="px-4 py-2">
          <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
          <p className=" leading-relaxed">{movie.overview}</p>
        </div>
        <div className="mb-4 ps-4 pt-5">
          <strong>Géneros:</strong>
          <div className="flex flex-wrap gap-2 mt-2 ">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4 flex justify-between items-center ps-4 pt-5 w-full">
          <span>
            <strong>Fecha de estreno:</strong>{" "}
            {new Date(movie.release_date).toLocaleDateString()}
          </span>
          <span>
            <strong>Duración:</strong> {movie.runtime} minutos
          </span>
        </div>
        <div className="flex items-center ps-4 pt-5">
          <span className="text-yellow-500 text-2xl">★</span>
          <span className="ml-2 text-lg font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
