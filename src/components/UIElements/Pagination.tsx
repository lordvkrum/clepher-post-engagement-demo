import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCaretLeft,
  faCaretRight,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
  const [goToPage, setGoToPage] = useState<number>(1);

  const paginationStyle = "text-xs w-8 h-8 rounded-full text-white";
  const firstPage = page === 1;
  const lastPage = page === totalPages;

  return (
    <div className="mt-2 flex items-center justify-center gap-4 py-2">
      <button
        className={classNames(paginationStyle, {
          "bg-slate-400": firstPage,
          "bg-slate-900": !firstPage,
        })}
        onClick={() => setPage(1)}
        disabled={firstPage}
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className={classNames(paginationStyle, {
          "bg-slate-400": firstPage,
          "bg-slate-900": !firstPage,
        })}
        onClick={() => setPage((prev) => (prev - 1 >= 1 ? prev - 1 : 1))}
        disabled={firstPage}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <button
        className={classNames(paginationStyle, {
          "bg-slate-400": lastPage,
          "bg-slate-900": !lastPage,
        })}
        onClick={() => {
          setPage((prev) => (prev + 1 <= totalPages ? prev + 1 : totalPages));
        }}
        disabled={lastPage}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
      <button
        className={classNames(paginationStyle, {
          "bg-slate-400": lastPage,
          "bg-slate-900": !lastPage,
        })}
        onClick={() => setPage(totalPages)}
        disabled={lastPage}
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
      <div>
        Page{" "}
        <b>
          {page} of {totalPages}
        </b>
      </div>
      <div className="hidden md:flex items-center justify-center gap-4">
        <div>-</div>
        <div>Go to page:</div>
        <input
          className="w-16 h-7 px-2 flex items-center rounded-lg border border-slate-400 bg-slate-50"
          type="number"
          value={goToPage}
          min={1}
          max={totalPages}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newPage = Number(e.target.value);
            setGoToPage(newPage);
            if (newPage >= 1 && newPage <= totalPages) {
              setPage(newPage);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
