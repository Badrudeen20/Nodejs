export const useHttp = () => {
  /* https://dtrm9n-5000.csb.app */
  const http = async (url,parms) => {
    const response = await fetch('http://localhost:5000'+url, parms)
    const json =  await response.json()
    return {
      response,json
    }
  }
  return { http }
}