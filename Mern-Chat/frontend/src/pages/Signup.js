import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const {signup, error, isLoading, emptyFields} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password,username)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>User Name:</label>
      <input 
        type="text" 
        className={emptyFields.includes('username') ? 'error' : ''}
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        className={emptyFields.includes('email') ? 'error' : ''}
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        className={emptyFields.includes('password') ? 'error' : ''}
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup