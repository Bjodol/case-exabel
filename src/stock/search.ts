import { client } from "./client";

export type SearchItem = {
  Code: string;
  Exchange: string;
  Name: string;
  Type: string;
  Country: string;
  Currency: string;
  ISIN: string;
  previousClose: number;
  previousCloseDate: string;
};

export type SearchQueryResult = SearchItem[];

export async function getSearch({ query }: { query: string }) {
  const data = await client<SearchQueryResult>({
    pathname: `/api/search/${query}`,
  });
  return data;
}
