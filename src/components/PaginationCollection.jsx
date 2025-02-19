import React, { useCallback } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

const PaginationCollection = ({ pages }) => {
  if (!pages || !pages.total || !pages.limit) return null;

  const totalPages = Math.ceil(pages.total / pages.limit);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const renderPagesHTML = (delta = 1) => {
    const pages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pages.push(i);
      }
    }
    return pages;
  };
  const renderPages = (page) => {
    return `?page=${page}`;
  };

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex gap-2 items-center">
        <Link to={renderPages(pages.prev)}>Trang truoc</Link>
        <li className="flex gap-2">
          {renderPagesHTML().map((item, index) => (
            <div
              className={`hover:scale-110 hover:bg-slate-200 transition ease-in-out p-2 ${
                item === currentPage ? "bg-slate-300" : ""
              }`}
              key={index}
            >
              <NavLink to={renderPages(item)} className={``}>
                {item}
              </NavLink>
            </div>
          ))}
        </li>
        <Link to={renderPages(pages.next)}>Trang sau</Link>
      </ul>
    </div>
  );
};

export default PaginationCollection;
