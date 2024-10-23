import {  useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom";
import './CountryDetail.css'
import CountryDetailShimmer from "../countryShimmer/CountryDetailShimmer";
import { useTheme } from "../../hooks/useTheme";


const CountryDetail = () => {
const [countryData, setCountryData] = useState(null);
const [notFound, setNotFound] = useState(false);
const {state} = useLocation()
const params = useParams();
const countryName = params.country;
const [isDark] = useTheme()

function updatedCountryData(data) {
  setCountryData( {
    name:data.name.common,
    nativeName:Object.values(data.name.nativeName)[0].common,
    population:data.population.toLocaleString('en-IN'),
    region:data.region,
    subregion:data.subregion,
    capital:data.capital.join(', '),
    flag: data.flags.svg,
    tld:data.tld,
    languages:Object.values(data.languages).join(', '),
    currencies:Object.values(data.currencies)
        .map((currency)=> currency.name)
        .join(', '),
    borders: []    
  })
  
  if(!data.borders) {
    data.borders = [];
  }

  Promise.all( data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => borderCountry.name.common )
    })).then((borders) => {
        setTimeout(()=> setCountryData((prevState) => ({...prevState, borders})))
    })
}


useEffect(() => {

  if(state) {
    updatedCountryData(state);
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {

    updatedCountryData(data);
    
    })
    .catch((error) => {
      setNotFound(true)
      console.log(error)
  })
  
},[countryName])

  if(notFound) {
    return <div>Country Not Found</div>
  }

  return countryData === null ? <CountryDetailShimmer/> : (
    <main className={`cd-container_wrap ${isDark ? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={()=> history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt="" />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name: </b><span className="native-name">{countryData.nativeName}</span></p>
              <p><b>Population: </b><span className="population">{countryData.population}</span></p>
              <p><b>Region: </b><span className="region">{countryData.region}</span></p>
              <p><b>Sub Region: </b><span className="sub-region">{countryData.subregion}</span></p>
              <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
              <p>
                <b>Top Level Domain: </b><span className="top-level-domain">{countryData.tld}</span>
              </p>
              <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
              <p><b>Languages: </b><span className="languages">{countryData.languages}</span></p>
            </div>
            {( countryData.borders.length > 0) && 
            
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {countryData.borders?.map((border) => {
                  return (
                    <Link key={border} to={`/${border}`}>{border}</Link>
                  )
              })} 
            
            </div>
            }

          </div>
        </div>
      </div>
    </main>
  )
}

export default CountryDetail