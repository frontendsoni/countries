

export default function SearchBar({countryName}) {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input type="text" onChange = {(e) => {countryName(e.target.value)}} placeholder="Search for a country..." />
    </div>
  );
}
