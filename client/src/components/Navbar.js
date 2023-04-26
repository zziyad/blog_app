import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import emitter from '../system/event';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [searcValue, setSearchValue] = useState('')
  const { currentUser, logout } = useContext(AuthContext);


  useEffect(() => {
    emitter.emit('search', { query, searcValue });
  }, [query, searcValue]);
  

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to='/'>
            <img src='/logo.png' alt='logo' />
          </Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
            <MyInput
              value={query}
              type="text"
              placeholder="Search posts by..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <MySelect
            
            value={searcValue}
            disabled={!query}
            onChange={(e) => setSearchValue(e)}
            defaultValue="title"
            options={[
              { value: "descr", name: "description" }
            ]}
            />

        </form>
        <div className='links'>
          <Link className='link' to='/?cat=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h6>FOOD</h6>
          </Link>
          <br />
          <span>
            <Link className='link' to='/user'>
              {currentUser?.username}
            </Link>
          </span>
          {
            currentUser ? (
              <>
                <span onClick={logout}>Logout</span>
                <br />
                <span className='write'>
                  <Link className='link' to='/write' >Write</Link>
                </span>
              </>
            ) : (
              <Link className='link' to='/login'>Login</Link>
            )}
        </div>
      </div>
    </div >
  )
}

export default Navbar