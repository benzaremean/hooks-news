import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const initialQuery = "react hooks";

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const searchInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <img  src="https://icon.now.sh/react/c0c" alt="React logo" className="float-right h-12"/>
      <h1 className="text-gray-600">Hooks News</h1>
      <form className="mb-2" onClick={handleSubmit}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button className="bg-orange-500 m-1 p-1 rounded" type="submit">
          Search
        </button>
        <button
          className="bg-teal-500 text-white m-1 p-1 rounded"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {isLoading ? (
        <div className="font-bold text-orange-800">Loading....</div>
      ) : (
        <ul classname="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a className="text-indigo-600 underline hover:text-indigo-900" href={result.url}>
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red-900 font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
