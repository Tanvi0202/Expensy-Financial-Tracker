import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import './style.css'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import userImg from '../../assets/user.svg'

function Header () {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/Dashboard')
    }
  }, [user, loading])

  function logoutFnc () {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success('Logged Out Successfully!')
          navigate('/')
        })
        .catch(error => {
          // An error happened.
          toast.error(error.message)
        })
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <div className='navbar'>
      <p className='logo'>Expensy</p>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: '50%', height: '2rem' }}
          />
          <p className='logo link' onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  )
}
export default Header
