const BASE_URL = "https://eodhd.com" as const;

// Mind this is a public api token
const apiToken = import.meta.env.VITE_EODHD_API_TOKEN;
if (!apiToken) throw new Error("Missing EODHD_API_TOKEN!");

const baseSearchParams = new URLSearchParams({
  api_token: apiToken,
  fmt: "json",
});

export async function client<U>({
  pathname,
  searchParams,
}: {
  pathname: `/api/search/${string}` | `/api/eod/${string}`;
  searchParams?: URLSearchParams;
}) {
  const search = `?${(searchParams
    ? new URLSearchParams([...baseSearchParams, ...searchParams])
    : baseSearchParams
  ).toString()}`;
  return [] as U;
  const url = new URL(`${pathname}${search}`, BASE_URL);
  const response = await fetch(url.toString());
  const data: U = await response.json();
  return data;
}
