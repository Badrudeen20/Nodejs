export const useHttp = () => {
  /* https://dtrm9n-5000.csb.app */
  const http = async (url,parms) => {
    const response = await fetch('https://gt782v.csb.app'+url, parms)
    const json =  await response.json()
    return {
      response,json
    }
  }
  return { http }
}