import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface PostEngagement {
  id: string;
  socialNetwork: string;
  name: string;
  engaged: number;
  unique: number;
  acquired: number;
  conversion: number;
}

export const findPostEngagementsQueryKey = "post-engagements";

interface UseFindPostEngagementsProps {
  page?: number;
  limit?: number;
  query?: string;
}

const getRandomValue = (n = 1) => Math.floor(n * Math.random());

export const useFindPostEngagements = ({
  page = 1,
  limit = 10,
  query = "",
}: UseFindPostEngagementsProps) => {
  const postEngagements: PostEngagement[] = useMemo(() => {
    console.log("run memo");
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
    queryKey: [findPostEngagementsQueryKey, { page, limit, query }],
    queryFn: () => {
      const start = (page - 1) * limit;
      let filtered = query
        ? postEngagements.filter((item) =>
            new RegExp(query, "i").test(item.name)
          )
        : postEngagements;
      console.log("run query", filtered, start, start + limit);
      return {
        page,
        posts: filtered.slice(start, start + limit),
        totalPages: Math.ceil(filtered.length / limit),
      };
    },
  });
};
