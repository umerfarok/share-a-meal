import { useState, useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { user, signIn } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await signIn(username, password)

    } catch (err) {
      setError(err.message)
    }
  }

  console.log({user})
  if (user) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="flex  h-[600px] w-full items-center justify-center px-4">
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md ">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold mb-5 text-purple-700">Login</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">

        </div>
        <TextField    className="w-full rounded-md " id="outlined-basic" label="Username" variant="outlined" color="secondary"   onChange={(e) => setUsername(e.target.value)}  value={username}/>
        <div className="space-y-2">
        <TextField    className="w-full rounded-md " id="outlined-basic" label="Password" variant="outlined" color="secondary"     value={password}
            onChange={(e) => setPassword(e.target.value)}/>
    
        </div>
        <button
          className="w-full rounded-md bg-purple-800 py-2 font-medium text-white transition-colors hover:bg-purple-700/80 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 "
          type="submit"
        >
          Login
        </button>
        <div className="text-center text-sm text-gray-500 underline hover:text-gray-900 ">
        <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </form>
    </div>
  </div>
  )
}