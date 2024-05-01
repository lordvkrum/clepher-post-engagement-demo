import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookMessenger,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  PostEngagement,
  PostEngagementSortDir,
  PostEngagementSortField,
  useFindPostEngagements,
} from "api/postEngagements";
import Dropdown from "components/UIElements/Dropdown";
import Pagination from "components/UIElements/Pagination";
import Table from "components/UIElements/Table";

const PostEngagementsList = (): JSX.Element => {
  const [sortField, setSortField] = useState<
    [PostEngagementSortField, PostEngagementSortDir]
  >(["name", "asc"]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, isLoading } = useFindPostEngagements({
    page,
    query: debouncedQuery,
    sortField: sortField[0],
    sortDir: sortField[1],
  });

  const totalPages = data?.totalPages || 1;
  const prevTotalPages = useRef<number>(1);

  useEffect(() => {
    prevTotalPages.current = totalPages;
  }, [totalPages]);

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
        <Table<PostEngagement>
          columns={[
            {
              key: "socialNetwork",
              text: "",
              width: 20,
              getContent: (item) => (
                <FontAwesomeIcon
                  icon={
                    item.socialNetwork === "fb"
                      ? faFacebookMessenger
                      : faInstagram
                  }
                />
              ),
            },
            { key: "name", text: "Name" },
            {
              key: "engaged",
              text: "Engaged / Unique",
              getContent: (item) => (
                <>
                  {item.engaged} / {item.unique}
                </>
              ),
            },
            { key: "acquired", text: "Acquired" },
            {
              key: "conversion",
              text: "Conversion",
              getContent: (item) => <>{item.conversion}%</>,
            },
            {
              key: "actions",
              text: "Actions",
              width: 30,
              sortable: false,
              getContent: (item) => (
                <Dropdown
                  text="Actions"
                  options={[{ text: "Edit" }, { text: "Delete" }]}
                />
              ),
            },
          ]}
          data={data?.posts}
          isLoading={isLoading}
          sortField={sortField}
          setSortField={(result) =>
            setSortField([
              result[0] as PostEngagementSortField,
              result[1] as PostEngagementSortDir,
            ])
          }
          getId={(item) => item.id}
        />
      </div>
      <Pagination
        totalPages={isLoading ? prevTotalPages.current : totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default PostEngagementsList;
