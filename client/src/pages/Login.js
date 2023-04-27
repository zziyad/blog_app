import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton.js'
import { AuthContext } from '../context/authContext.js';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [error, setError] = useState({ status: '', reason: null});


  const handelChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const res = await login(inputs);
      if (res.reason) return setError(res);
      document.cookie = res.token;
      navigate('/');
    } catch (error) {
      setError({ status: 'rejected', reason:error.message})

    }
  }


  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handelChange} />
        <input required type='password' placeholder='password' name='password' onChange={handelChange} />
        <MyButton onClick={handleSubmit}>Login</MyButton>
        {error.status === 'rejected' && <p>{error.reason}</p>}
        <span>
          Don't you have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login