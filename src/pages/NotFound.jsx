import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
