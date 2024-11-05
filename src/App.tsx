import "./App.css";
import { useEffect, useId, useState } from "react";
import { getSearch, SearchQueryResult } from "./stock/search";
import { EODQueryResult, getEOD, Period } from "./stock/eod";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type QueryState = {
  query: string;
  showOpen: boolean;
  period: Period;
  ticker: string;
};

function App() {
  const [{ query, showOpen, period, ticker }, setState] = useState<QueryState>({
    query: "",
    showOpen: false,
    period: "d",
    ticker: "",
  }); // Alternatively use react-hook-form or server actions if on react canary

  const [searchResults, setSearchResults] = useState<SearchQueryResult>([]); // Alternatively useSWR or react query or server components
  const [eod, setEOD] = useState<EODQueryResult>([]); // Alternatively useSWR or react query or server components

  // Could be its own page and use links + routing instead of a local state.
  useEffect(() => {
    const loadEOD = async () => {
      const results = await getEOD({ ticker, period });
      setEOD(results);
    };
    loadEOD();
  }, [ticker, period]);

  const searchFieldId = useId();
  const showOpenFieldId = useId();
  const periodFieldId = useId();

  return (
    <main>
      <section>
        <h1>Search</h1>
        <form
          className="search"
          onSubmit={async (e) => {
            e.preventDefault();
            const results = await getSearch({ query: query });
            setSearchResults(results);
          }}
        >
          <label htmlFor={searchFieldId}>Search ticker</label>
          <input
            id={searchFieldId}
            name="query"
            type="text"
            onChange={({ target: { value } }) =>
              setState((prev) => ({ ...prev, query: value }))
            }
            value={query}
          />
          <button type="submit">Search</button>
        </form>
        <h2>Search results</h2>
        <ul className="search-results">
          {searchResults.map(({ Code, Exchange }) => {
            const ticker = `${Code}.${Exchange}`;
            return (
              <li key={ticker}>
                <h3>{ticker}</h3>
                <button
                  onClick={() => setState((prev) => ({ ...prev, ticker }))}
                >
                  Load EOD
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="eod-graph">
        <h2>{`EOD: ${ticker || "-"}`}</h2>
        <label htmlFor={showOpenFieldId}>Show open</label>
        <input
          type="checkbox"
          id={showOpenFieldId}
          name="showOpen"
          onChange={({ target: { checked } }) =>
            setState((prev) => ({ ...prev, showOpen: checked }))
          }
          checked={showOpen}
        />
        <label htmlFor={showOpenFieldId}>Show open</label>
        <select
          id={periodFieldId}
          name="showOpen"
          onChange={async ({ target: { value } }) =>
            setState((prev) => ({ ...prev, period: value as Period }))
          }
          value={period}
        >
          <option value="d">Day</option>
          <option value="w">Week</option>
          <option value="m">Month</option>
        </select>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={eod}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="high"
              stroke="var(--high)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="var(--low)"
              dot={false}
            />
            {showOpen ? (
              <Line
                type="monotone"
                dataKey="open"
                stroke="var(--open)"
                dot={false}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}

export default App;
