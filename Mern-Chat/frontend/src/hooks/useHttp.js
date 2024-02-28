export const useHttp = () => {
  const http = async (url,parms) => {
    const response = await fetch('https://dtrm9n-5000.csb.app'+url, parms)
    const json =  await response.json()
    return {
      response,json
    }
  }

  return { http }
}