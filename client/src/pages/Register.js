import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import scaffolding from '../system/client';


const Register = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  const [err, setError] = useState(null);

  const handelChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scaffolding.load('auth');
      const res = await scaffolding.api.auth.register(inputs);
      if (res.status === 'rejected') return setError(res.reason);
      navigate('/login');
    } catch (error) {
      setError(error);
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
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  )

}

export default Register