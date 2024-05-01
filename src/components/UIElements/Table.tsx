import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faSquareCheck,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

interface TableColumn<DataType> {
  key: string;
  text: string;
  width?: number;
  sortable?: boolean;
  getContent?: (item: DataType) => React.ReactNode;
}

interface TableProps<DataType> {
  columns: TableColumn<DataType>[];
  data?: DataType[];
  isLoading?: boolean;
  sortField?: string[];
  setSortField?: (result: string[]) => void;
  getId?: (item: DataType) => string;
}

function Table<DataType>({
  columns,
  data,
  isLoading,
  sortField,
  setSortField,
  getId,
}: TableProps<DataType>): JSX.Element {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState<
    "all" | "some-all" | "some-none" | "none"
  >("none");

  const tableCellStyle = "px-3 py-2 text-start";

  return (
    <table className="table w-full text-xs px-6 bg-slate-50 rounded-xl">
      <thead className="sticky z-10 top-0 font-semibold text-slate-500">
        <tr>
          <th
            className={classNames(tableCellStyle, "bg-slate-50 rounded-ss-xl")}
            style={{ width: 20 }}
          >
            <button
              className="text-lg w-full min-h-3 flex items-center"
              onClick={() => {
                setSelected({});
                if (selectAll === "all") {
                  setSelectAll("none");
                } else {
                  setSelectAll("all");
                }
              }}
            >
              <FontAwesomeIcon
                icon={
                  selectAll === "all"
                    ? faSquareCheck
                    : selectAll !== "none"
                    ? faSquareMinus
                    : faSquare
                }
              />
            </button>
          </th>
          {columns.map((col, index) => {
            const { sortable = true } = col;
            return (
              <th
                key={col.key || col.text}
                className={classNames(tableCellStyle, "bg-slate-50", {
                  "rounded-se-xl": index === columns.length - 1,
                })}
                style={{ width: col.width || 150 }}
              >
                <button
                  className="w-full min-h-3 flex items-center"
                  onClick={() => {
                    if (sortable)
                      setSortField?.([
                        col.key,
                        sortField?.[0] === col.key
                          ? sortField?.[1] === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                      ]);
                  }}
                >
                  {sortField?.[0] === col.key && (
                    <FontAwesomeIcon
                      className="pe-2"
                      icon={sortField?.[1] === "asc" ? faArrowUp : faArrowDown}
                    />
                  )}
                  {col.text}
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td className="p-2 text-center" colSpan={7}>
              Loading...
            </td>
          </tr>
        ) : !data?.length ? (
          <tr>
            <td className="p-2 text-center" colSpan={7}>
              No Results
            </td>
          </tr>
        ) : (
          data?.map((item, index) => {
            const itemId = getId?.(item) || index;
            const itemSelected =
              selectAll === "all" ||
              (selectAll === "some-all" && selected[itemId] !== false) ||
              selected[itemId];

            return (
              <tr key={itemId} className="border-t border-t-slate-300">
                <td className={tableCellStyle} style={{ width: 20 }}>
                  <button
                    className="text-lg w-full min-h-3 flex items-center"
                    onClick={() => {
                      const newValue = !itemSelected;
                      setSelected((prev) => ({
                        ...prev,
                        [itemId]: newValue,
                      }));
                      if (selectAll === "all") {
                        if (!newValue) {
                          setSelectAll("some-all");
                        }
                      } else {
                        if (newValue) {
                          setSelectAll("some-none");
                        }
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={itemSelected ? faSquareCheck : faSquare}
                    />
                  </button>
                </td>
                {columns.map((col) => {
                  return (
                    <td
                      key={col.key || col.text}
                      className={tableCellStyle}
                      style={{ width: col.width || 150 }}
                    >
                      {col.getContent?.(item) ||
                        (item as Record<string, React.ReactNode>)?.[col.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
export default Table;
