import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import scaffolding from '../system/client';


const Register = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState({ status: '', reason: null});

  const handelChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scaffolding.load('auth');
      const res = await scaffolding.api.auth.register(inputs);
      if (res.status === 'rejected') return setError(res);
      navigate('/login');
    } catch (error) {
      setError({ status: 'rejected', reason:error.message})

    }
  }


  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handelChange} />
        <input required type='text' placeholder='email' name='email' onChange={handelChange} />
        <input required type='password' placeholder='password' name='password' onChange={handelChange} />
        <button onClick={handleSubmit}>Register</button>
        {error.status === 'rejected' && <p>{error.reason}</p>}
        <span>
          Do you have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  )

}

export default Register