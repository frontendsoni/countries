

export default function SelectMenu({regionName}) {
  return (
    <select className="filter-by-region" onChange={(e) => {regionName(e.target.value)}}>
          <option hidden>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
    </select>
  )
}
