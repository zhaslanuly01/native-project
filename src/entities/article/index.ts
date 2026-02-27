export type {
  Article,
  GetTopHeadlinesParams,
  NewsApiResponse,
  NewsSource,
  SearchEverythingParams,
} from "./models/article.types";

export {
  useGetTopHeadlinesQuery,
  useSearchEverythingQuery,
} from "./api/articleApi";
