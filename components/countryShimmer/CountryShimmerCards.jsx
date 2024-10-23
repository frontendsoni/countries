import "./CountryShimmerCards.css"

const CountryShimmerCards = () => {
  return (
    <>
      <div className="countries-container">
        {
            Array.from({length:10}).map((card ,i) => {
              return <div key={i} className="country-card shimmer-card"></div>
            })
        }
      </div>
    </>
  )
}

export default CountryShimmerCards