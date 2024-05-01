import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useFindPostEngagements } from "api/postEngagements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "components/UIElements/Dropdown";
import classNames from "classnames";
import {
  faFacebookMessenger,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Pagination from "components/UIElements/Pagination";

const PostEngagementsList = () => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, isLoading } = useFindPostEngagements({
    page,
    query: debouncedQuery,
  });

  const tableCellStyle = "px-3 py-2 text-start";

  return (
    <div className="px-6 h-full flex flex-col">
      <div className="mb-2 flex flex-row items-end gap-2">
        <h2 className="grow truncate text-xl">Post Engagments</h2>
        <div className="hidden md:flex w-52 h-7 flex items-center rounded-lg border border-slate-400 bg-slate-50">
          <FontAwesomeIcon className="px-2" icon={faSearch} />
          <input
            className="h-full w-full no-border rounded-lg focus:outline-none"
            type="text"
            placeholder="Search..."
            value={query}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
            }}
          />
          {query && (
            <button
              className="px-2 h-full bg-slate-300 rounded-e-lg"
              onClick={() => setQuery("")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
        <Dropdown text="Bulk Actions" options={[{ text: "Delete" }]} />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="table w-full text-sm px-6 bg-slate-50 rounded-xl">
          <thead className="sticky z-10 top-0 font-semibold text-slate-500">
            <tr>
              <th
                className={classNames(
                  tableCellStyle,
                  "bg-slate-50 rounded-ss-xl"
                )}
                style={{ width: 20 }}
              >
                <input type="checkbox" className="checkbox checkbox-sm" />
              </th>
              <th
                className={classNames(tableCellStyle, "bg-slate-50")}
                style={{ width: 20 }}
              />
              <th
                className={classNames(tableCellStyle, "bg-slate-50")}
                style={{ width: 150 }}
              >
                Name
              </th>
              <th
                className={classNames(tableCellStyle, "bg-slate-50")}
                style={{ width: 150 }}
              >
                Engaged / Unique
              </th>
              <th
                className={classNames(tableCellStyle, "bg-slate-50")}
                style={{ width: 150 }}
              >
                Acquired
              </th>
              <th
                className={classNames(tableCellStyle, "bg-slate-50")}
                style={{ width: 150 }}
              >
                Conversion
              </th>
              <th
                className={classNames(
                  tableCellStyle,
                  "bg-slate-50 rounded-se-xl"
                )}
                style={{ width: 30 }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-2 text-center" colSpan={7}>
                  Loading...
                </td>
              </tr>
            ) : !data?.posts?.length ? (
              <tr>
                <td className="p-2 text-center" colSpan={7}>
                  No Results
                </td>
              </tr>
            ) : (
              data?.posts?.map((item) => {
                return (
                  <tr key={item.id} className="border-t border-t-slate-300">
                    <td className={tableCellStyle} style={{ width: 20 }}>
                      <input type="checkbox" className="checkbox checkbox-sm" />
                    </td>
                    <td className={tableCellStyle} style={{ width: 20 }}>
                      <FontAwesomeIcon
                        icon={
                          item.socialNetwork === "fb"
                            ? faFacebookMessenger
                            : faInstagram
                        }
                      />
                    </td>
                    <td className={tableCellStyle} style={{ width: 150 }}>
                      {item.name}
                    </td>
                    <td className={tableCellStyle} style={{ width: 150 }}>
                      {item.engaged} / {item.unique}
                    </td>
                    <td className={tableCellStyle} style={{ width: 150 }}>
                      {item.acquired}
                    </td>
                    <td className={tableCellStyle} style={{ width: 150 }}>
                      {item.conversion}%
                    </td>
                    <td className={tableCellStyle} style={{ width: 30 }}>
                      <Dropdown
                        text="Actions"
                        options={[{ text: "Edit" }, { text: "Delete" }]}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={data?.totalPages || 1}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default PostEngagementsList;
