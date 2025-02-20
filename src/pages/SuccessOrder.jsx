import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SuccessOrder = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Order Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been confirmed and is
          being processed.
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/"
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Homepage
          </Link>
          <Link
            to="/collection"
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
