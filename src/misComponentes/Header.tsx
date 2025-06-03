import Link from "next/link";

export function Header() {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">
          Movie Explorer - Luis Lopez Puig
        </h1>
        <p className="text-center mt-2">
          Explora las últimas películas y series de TV
        </p>
      </div>

      <nav className="mt-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link
              href="/MovieExplorer"
              className="text-white hover:text-gray-300">
              Explorador de Películas
            </Link>
          </li>
          <li>
            <Link href="/About" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
