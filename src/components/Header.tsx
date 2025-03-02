import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/todo"
              className={`${
                location.pathname === "/todo"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/counter"
              className={`${
                location.pathname === "/counter"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Counter
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
