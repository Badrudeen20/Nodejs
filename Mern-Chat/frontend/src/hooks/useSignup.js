import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useHttp } from './useHttp'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const [emptyFields, setEmptyFields] = useState([])
  const { http } = useHttp()
  const signup = async (email, password,username) => {
    setIsLoading(true)
    setError(null)
    const {json,response} = await http('/api/user/signup',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password,username})
    })
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error, emptyFields }
}