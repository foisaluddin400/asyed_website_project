import React from 'react'

const ProtectedRoute = ({ children }) => {
    const accessToken = useSelector((state) => state.logInUser?.token);
    console.log(accessToken)
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute