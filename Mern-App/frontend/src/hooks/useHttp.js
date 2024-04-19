export const useHttp = () => {
  /* https://dtrm9n-5000.csb.app */
  const http = async (url,parms) => {
    //const url = `https://${req.get('host')}${req.originalUrl}`;
    const rootUrl = window.location.origin;
    console.log('Root URL:', rootUrl);
    const response = await fetch('http://localhost:5000'+url, parms)
    const json =  await response.json()
    return {
      response,json
    }
  }
  return { http }
}