


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../firebase/auth';
import { signIn, signUserOut } from '../../features/blogSlices';
import { useNavigate } from 'react-router';

const Login = () => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user)

  const navigate=useNavigate();

  const handleLogin = async () => {
    const user = await authService.loginWithGoogle();
    dispatch(signIn(user))
  }

  if(isLoggedIn){
    navigate('/')
  }


  return (
    <div>
      <button className='bg-yellow-300 rounded px-3 py-1' onClick={handleLogin}>Login with google</button>
    </div>
  )
}

export default Login


