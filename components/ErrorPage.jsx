import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error =  useRouteError()
  return (
    <div> {`${error.status}, Data not found`}</div>
  )
}

export default ErrorPage