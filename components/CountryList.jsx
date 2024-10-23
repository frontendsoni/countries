import CountryCard from "./CountryCard";
import CountryShimmerCards from "./countryShimmer/CountryShimmerCards";

export default function CountryList({ countryData, query, region }) {

  if(countryData.length == 0) {
    return <CountryShimmerCards/>
  }

  return (
    <div className="countries-container">
      {
        (countryData || [])?.filter((country) => {

          if (query) {
           return country.name.common.toLowerCase().includes(query.toLowerCase())
           
          }
          if (region) {  
            return country.region.toLowerCase().includes(region.toLowerCase())
          }
          
          return true;
        })
        ?.map((country) => {
        

          return (
            <CountryCard 
              key={country?.name?.common}
              flag={country?.flags?.svg}
              country={country?.name?.common}
              population={country?.population.toLocaleString('en-IN')}
              region={country?.region}
              capital={country?.capital?.[0]}
              data = {country}
            />
          );
        })
      }
    </div>
  );
}
