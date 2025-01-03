import React from "react";
import "./searchBar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="location"
          placeholder="City Location"
          id="location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={100000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={100000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
