import React from 'react'
import Header from '../components/Header'
import SignupSigninComponent from '../components/signup_signin'
function SignUpSignIn () {
  return (
    <div>
      <Header />
      <div className='wrapper'>
      <SignupSigninComponent/>
      </div>
    </div>
  )
}
export default SignUpSignIn
