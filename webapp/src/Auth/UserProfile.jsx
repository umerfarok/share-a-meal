import { useContext, useEffect } from "react"
import { AuthContext } from "./AuthContext"

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      window.location.href = "/login"
    }
  }, [user])

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username:{user.idToken.payload["cognito:username"]}</p>
          <p>Email: {user.idToken.payload.email}</p>
          {/* Display any other user data here */}
        </div>
      )}
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}