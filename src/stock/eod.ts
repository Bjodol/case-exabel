import { client } from "./client";

export type EOD = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close: number;
  volume: number;
};

export type EODQueryResult = EOD[];

export type Period = "d" | "w" | "m";

export async function getEOD({
  ticker,
  period = "d",
}: {
  ticker: string;
  period?: Period;
}) {
  const data = await client<EODQueryResult>({
    pathname: `/api/eod/${ticker}`,
    searchParams: new URLSearchParams({ period }),
  });
  return data;
}
