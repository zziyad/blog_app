import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton.js'
import { AuthContext } from '../context/authContext.js';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [err, setError] = useState(null);


  const handelChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const res = await login(inputs);
      if (res.err) return setError(res.err);
      document.cookie =  res.token
      navigate('/');
    } catch (error) {
      setError(error);
    }
  }


  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handelChange} />
        <input required type='password' placeholder='password' name='password' onChange={handelChange} />
        <MyButton onClick={handleSubmit}>Login</MyButton>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login