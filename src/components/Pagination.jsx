import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ pages }) => {
  const { total, limit, currentPage } = pages;
  const [searchParams, setSearchparams] = useSearchParams();
  const name = searchParams.get("keyword");
  const totalPages = Math.ceil(total / limit);
  const renderPagesHTML = (delta = 2) => {
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
    return `/search?keyword=${name}&page=${page}`;
  };
  return (
    <div className="mx-[20px] mt-[20px]">
      <div>
        <ul className="flex gap-2 items-center">
          <li>Trang truoc</li>
          <li className="flex gap-2">
            {renderPagesHTML().map((item, index) => (
              <div
                className="hover:scale-110 hover:bg-slate-200 transition ease-in-out p-2"
                key={index}
              >
                <Link to={renderPages(item)}>{item}</Link>
              </div>
            ))}
          </li>
          <li>Trang sau</li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
