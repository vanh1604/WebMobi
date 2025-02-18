import React from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

const PaginationCollection = ({ pages }) => {
  if (!pages || !pages.total || !pages.limit) return null;

  const { total, limit, next, prev, currentPage } = pages;
  const totalPages = Math.ceil(total / limit);
  const [searchParams, setSearchParams] = useSearchParams();

  const renderPagesHTML = (delta = 1) => {
    const pagesArray = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pagesArray.push(i);
      }
    }
    return pagesArray;
  };

  const renderPages = (page) => {
    searchParams.set("page", page);
    return `?${searchParams.toString()}`;
  };

  return (
    <div className="mx-[20px] mt-[20px] mb-[20px]">
      <div>
        <ul className="flex gap-2 items-center">
          <li>
            <Link
              to={prev ? renderPages(prev) : "#"}
              className={`p-2 border rounded-lg ${
                prev ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Trang trước
            </Link>
          </li>
          <li className="flex gap-2">
            {renderPagesHTML().map((item, index) => (
              <NavLink
                to={renderPages(item)}
                key={index}
                className={`p-2 border rounded-lg ${
                  item === currentPage
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item}
              </NavLink>
            ))}
          </li>
          <li>
            <Link
              to={next ? renderPages(next) : "#"}
              className={`p-2 border rounded-lg ${
                next ? "hover:bg-gray-200" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Trang sau
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaginationCollection;
