import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useSelector } from 'react-redux';
import useLoadData from '../system/useLoadData';
import { useLocation } from 'react-router-dom';
import emitter from '../system/event';

// const emitter = new EventEmitter();

const Home = () => {
  const [, category] = useLocation().search.split('=');
  const [searchValue, setSearchValue] = useState('');

  useLoadData({ type: 'post', method: 'getPosts', args: category || false }, []);
  

  useEffect(() => {
    const handleSearch = (data) => {
      setSearchValue(data);
    };

    emitter.on('search', handleSearch);

    return () => {
      emitter.clear('search');
    };
  }, []);
  
  console.log({ searchValue });
  const {data, status, error} = useSelector((state) => state.scaffolding);
 
  return (
    <div>
      <div className='home'>
        <div className='posts'>
          <Post data={data} error={error} status={status}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
