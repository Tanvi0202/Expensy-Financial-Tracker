import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import Button from '../button'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider

} from 'firebase/auth'
import { auth,provider, db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SignupSigninComponent () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginForm, setLoginForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function signUpWithEmail () {
    setLoading(true)
    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            // Signed up
            const user = userCredential.user
            toast.success('User Created!')
            // ...
            setLoading(false)
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            createDoc(user)
            navigate('/Dashboard')
          })
          .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            toast.error(errorMessage)
            // ..
            setLoading(false)
          })
      } else {
        toast.error('Password Do not Match!')
        setLoading(false)
      }
    } else {
      toast.error('All Fields are Mandatory!')
      setLoading(false)
    }
  }

  function loginInUsingEmail () {
    setLoading(true)
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          // ...
          toast.success('User Logged In!')
          setLoading(false)

          navigate('/Dashboard')
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          toast.error(errorMessage)
          setLoading(false)
        })
    } else {
      toast.error('All Fields are Mandatory!')
      setLoading(false)
    }
  }

  async function createDoc (user) {
    setLoading(true)

    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    const userData = await getDoc(userRef)

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : '',
          createdAt: new Date()
        })
        toast.success('Account Created!')
        console.log(user)
        setLoading(false)
      } catch (error) {
        toast.error(error.message)

        setLoading(false)
      }
    } else {
      
      setLoading(false)
    }
  }

  function googleAuth () {
    setLoading(true)
    try {
      signInWithPopup(auth, provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          console.log(user);
          createDoc(user);
          navigate('/Dashboard');
          toast.success("User Logged in!")

          setLoading(false)

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          toast.error(errorMessage)
          setLoading(false)


          // ...
        });
    } catch (e) {
      toast.error(e.message)
      setLoading(false)

    }
  }

  return (
    <>
      {loginForm ? (
        <div className='signup_wrapper'>
          <h2 className='title'>
            Login in on <span style={{ color: 'var(--theme)' }}>Expensy</span>
          </h2>
          <form>
            <Input
              type='email'
              label={'Email'}
              state={email}
              setState={setEmail}
              placeHolder={'Enter Your Email-id'}
            />
            <Input
              type='password'
              label={'Password'}
              state={password}
              setState={setPassword}
              placeHolder={'Enter Your Password'}
            />

            <Button
              disabled={loading}
              text={loading ? 'Loading...' : 'Login using Email and Password'}
              onClick={loginInUsingEmail}
            />
            <p className='p-login'>OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? 'Loading...' : 'Login using Google'}
              blue={true}
            />
            <p className='p-login'>
              Or Don't Have an Account?{' '}
              <span
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => setLoginForm(!loginForm)}
              >
                Click Here!
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className='signup_wrapper'>
          <h2 className='title'>
            Sign Up on <span style={{ color: 'var(--theme)' }}>Expensy</span>
          </h2>
          <form>
            <Input
              label={'Full Name'}
              state={name}
              setState={setName}
              placeHolder={'Enter Your Name'}
            />
            <Input
              type='email'
              label={'Email'}
              state={email}
              setState={setEmail}
              placeHolder={'Enter Your Email-id'}
            />
            <Input
              type='password'
              label={'Password'}
              state={password}
              setState={setPassword}
              placeHolder={'Enter Your Password'}
            />
            <Input
              type='password'
              label={'Confirm Password'}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeHolder={'Enter Your Password Again'}
            />
            <Button
              disabled={loading}
              text={loading ? 'Loading...' : 'Sign-Up using Email and Password'}
              onClick={signUpWithEmail}
            />
            <p className='p-login'>OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? 'Loading...' : 'Sign-Up using Google'}
              blue={true}
            />

            <p className='p-login'>
              Or Have an Account Aready?{' '}
              <span
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => setLoginForm(!loginForm)}
              >
                Click Here!
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  )
}
export default SignupSigninComponent
