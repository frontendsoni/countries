import { Link } from "react-router-dom";


export default function CountryCard({flag, country, population, region, capital, data}) {

  return (
    <Link className = 'country-card' to={`/${country}`} state={data}>
      <img src={flag} alt ='' />
      <div className="card-text">
        <h3 className="card-title">{country}</h3>
        <p><b>Population:</b> {population}</p>
        <p><b>Region:</b> {region}</p>
        <p><b>Capital:</b> { capital }</p>
      </div>
    </Link>

  )
}
