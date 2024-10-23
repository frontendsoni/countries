import { useEffect , useState} from 'react';
import SearchBar from "../components/SearchBar";
import SelectMenu from "../components/SelectMenu";
import CountryList from "../components/CountryList";
import { useTheme } from '../hooks/useTheme';



const Home = () => {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const [countryData, setCountryData] = useState('')
  const [isDark] = useTheme()

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      setCountryData(data)
    })
    
  }, [])

  return (

    <>
      <main className={isDark ? 'dark': ''}>
        <div className="search-filter-container">
          <SearchBar countryName = {setQuery}/>
          <SelectMenu regionName = {setRegion}/>
        </div>

        <CountryList countryData = {countryData} query = {query} region={region} />
      </main>
    </>

  )
}

export default Home