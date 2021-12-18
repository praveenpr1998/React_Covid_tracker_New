import React, {  useState } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./FilterToolBar.scss";

function FilterToolBar(props) {
  const {
    title,
    onSearchValueChange,
    onSortByChange,
    onDateFilterChange,
    onDistrictFilterChange,
    districts,
    resetFilters,
  } = props;

  const [searchValue, setSearchValue] = useState("");
  const [sortFilter, setsortFilter] = useState({ value: "", sortBy: "asc" });
  const [dateFilter, setDateFilter] = useState({ value: "", enabled: false });
  const [choosenDistrict, setChoosenDistrict] = useState("");

  const sortOptions = [
    {
      name: "Confirmed Count",
      value: "confirmedCount",
    },
    {
      name: "Affected Percentage",
      value: "affectedPercentage",
    },
    {
      name: "Vaccinated Percentage",
      value: "vaccinatedPercentage",
    },
  ];

  const onSortOptionChange = (e) => {
    const value = e.target.value;
    const updateObj = { ...sortFilter, value: value };
    setsortFilter(updateObj);
    onSortByChange(updateObj);
  };

  const onSortByOptionChange = (e) => {
    const value = e.target.value;
    const updateObj = { ...sortFilter, sortBy: value };
    setsortFilter(updateObj);
    onSortByChange(updateObj);
  };

  const onSearch = (e) => {
    const value = e.target.value;
    onSearchValueChange(value);
    setSearchValue(value);
  };

  const onDateFilter = (e) => {
    const value = e.target.value;
    const updateObj = { ...dateFilter, value: value };
    onDateFilterChange(updateObj);
    setDateFilter(updateObj);
  };

  const onDateFilterToggle = (e) => {
    const value = e.target.checked;
    const updateObj = { ...dateFilter, enabled: value };
    onDateFilterChange(updateObj);
    setDateFilter(updateObj);
  };

  const onDistrictChange = (e) => {
    const value = e.target.value;
    setChoosenDistrict(value);
    onDistrictFilterChange(value);
  };

  const resetFiltersClick = () => {
    setSearchValue("");
    setsortFilter({ value: "", sortBy: "asc" });
    setDateFilter({ value: "", enabled: false });
    setChoosenDistrict("");
    resetFilters();
  };

  return (
    <div className="FilterToolBar pl5 pr5">
      <ErrorBoundary>
        <span className="title">{title}</span>
        {onSearchValueChange && (
          <div className="search-filter">
            <label htmlFor="searchFilter">Search </label>
            <input
              type="text"
              className="input-box"
              placeholder="Search..."
              value={searchValue}
              onChange={onSearch}
            />
          </div>
        )}
        <div className="date-filter">
          <div>
            <label htmlFor="dateFilterOptions">Fiter By Date </label>{" "}
            <input
              type="checkbox"
              className="input-box"
              id="dateFilterEnable"
              name="dateFilterEnable"
              checked={dateFilter.enabled}
              onChange={onDateFilterToggle}
            />
          </div>{" "}
          <input
            disabled={!dateFilter.enabled}
            value={dateFilter.value}
            onChange={onDateFilter}
            className="input-box"
            type="date"
            id="filter-date"
            name="filter-date"
          />
        </div>
        <div className="sort-filter">
          <label htmlFor="sortByOptions">Sort By </label>
          <div>
            <select
              name="sortByOptions"
              id="sortByOptions"
              className="input-box"
              value={sortFilter.value}
              onChange={onSortOptionChange}
            >
               {" "}
              <option id="Select" value="">
                Select Option
              </option>
              {sortOptions.map((item, i) => (
                <option id={item.value} key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            {sortFilter.value && (
              <select
                name="sortByAscDesc"
                id="sortByAscDesc"
                className="input-box"
                value={sortFilter.sortBy}
                onChange={onSortByOptionChange}
              >
                 {" "}
                <option id="Ascending" value="asc">
                  Ascending
                </option>
                 {" "}
                <option id="Descending" value="desc">
                  Descending
                </option>
              </select>
            )}
          </div>
        </div>
        {onDistrictFilterChange && (
          <div className="district-filter">
            <label htmlFor="sortByOptions">Filter District </label>
            <select
              name="sortByOptions"
              id="sortByOptions"
              className="input-box"
              value={choosenDistrict}
              onChange={onDistrictChange}
            >
               {" "}
              <option id="Select" value="">
                Select Option
              </option>
              {districts &&
                Object.keys(districts).map((district, i) => (
                  <option id={district} key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
        )}
        {resetFilters && (
          <div className="reset-filter">
            <label htmlFor="resetButton"></label>
            <button type="button" onClick={resetFiltersClick}>
              Reset
            </button>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

export default FilterToolBar;
