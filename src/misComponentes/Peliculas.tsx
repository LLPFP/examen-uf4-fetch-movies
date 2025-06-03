import Image from "next/image";
import { useState } from "react";
import Detalle from "./Detalle"; // Asegúrate de que la ruta sea correcta

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function PeliculasCard({ movie }: MovieCardProps) {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const title = movie.title || movie.name || "Sin título";
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  function mostrarDetalles() {
    setMostrarDetalle(true);
  }

  function cerrarDetalles() {
    setMostrarDetalle(false);
  }

  return (
    <div className="p-4" key={movie.id} onClick={() => mostrarDetalles()}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-64">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-black">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-black">
            {title}
          </h3>
          <p className="text-black text-sm mb-2">Año: {year}</p>
          <p className="text-black text-sm line-clamp-3 ">{movie.overview}</p>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      {mostrarDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              onClick={cerrarDetalles}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold">
              ×
            </button>
            <Detalle id={movie.id} />
          </div>
        </div>
      )}
    </div>
  );
}
