const FilterSearch = (query, setFilteredStatus, dataToFilter, setFilteredData) => {
  if (query.trim().length > 0) {
    console.log("greater than query");
    setFilteredStatus(true);
  } else {
    setFilteredStatus(false);
  }
  const filtered = dataToFilter.filter((emp) => emp.username.toLowerCase().includes(query.toLowerCase()));
  setFilteredData(filtered);
};

export default FilterSearch;
