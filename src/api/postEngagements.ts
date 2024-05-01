import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

export interface PostEngagement {
  id: string;
  socialNetwork: string;
  name: string;
  engaged: number;
  unique: number;
  acquired: number;
  conversion: number;
}

export type PostEngagementSortField = keyof PostEngagement;
export type PostEngagementSortDir = "asc" | "desc";

export const findPostEngagementsQueryKey = "post-engagements";

interface UseFindPostEngagementsProps {
  page?: number;
  limit?: number;
  query?: string;
  sortField?: PostEngagementSortField;
  sortDir?: PostEngagementSortDir;
}

const getRandomValue = (n = 1) => Math.floor(n * Math.random());

export const useFindPostEngagements = ({
  page = 1,
  limit = 10,
  query = "",
  sortField = "name",
  sortDir = "asc",
}: UseFindPostEngagementsProps) => {
  const postEngagements: PostEngagement[] = useMemo(() => {
    return new Array(15 + getRandomValue(50)).fill("").map(() => {
      return {
        id: faker.string.uuid(),
        socialNetwork: ["ig", "fb"][getRandomValue(2)],
        name: faker.lorem.word(),
        engaged: 30 + getRandomValue(30),
        unique: 10 + getRandomValue(20),
        acquired: getRandomValue(100),
        conversion: getRandomValue(100),
      };
    });
  }, []);

  return useQuery({
    queryKey: [
      findPostEngagementsQueryKey,
      { page, limit, query, sortField, sortDir },
    ],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => resolve(""), 300 + 500 * Math.random());
      });
      const start = (page - 1) * limit;
      let filtered = query
        ? postEngagements.filter((item) =>
            new RegExp(query, "i").test(item.name)
          )
        : postEngagements;
      filtered = filtered.sort((item1, item2) => {
        if (typeof item1[sortField] === "string") {
          return sortDir === "asc"
            ? String(item1[sortField]).localeCompare(String(item2[sortField]))
            : String(item2[sortField]).localeCompare(String(item1[sortField]));
        }
        return sortDir === "asc"
          ? Number(item1[sortField]) - Number(item2[sortField])
          : Number(item2[sortField]) - Number(item1[sortField]);
      });
      console.log("run query", filtered, start, start + limit);
      return {
        page,
        posts: filtered.slice(start, start + limit),
        totalPages: Math.ceil(filtered.length / limit),
      };
    },
  });
};
