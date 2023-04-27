import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scaffolding from '../system/client';
import emitter from '../system/event';
import useDebounce from '../hooks/useDebounce'
const { api } = scaffolding;

const Home = React.memo(() => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [serchBy, setSearchBy] = useState('')
  const [result, setResult] = useState([])
  const [error, setError] = useState({ status: '', reason: null});

  const debounce = useDebounce(searchValue, 500); 
  const [, category] = useLocation().search.split('=');

const search = useMemo(() => {
  return (textToSearch, newPosts) => {
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    let pattern = new RegExp(`${textToSearch}`,"gi");
    const searchPost = newPosts.map((post) => {
      const f = post[`${serchBy}`].replace(pattern, match => 
        `<mark>${match}</mark>`)

      return serchBy === 'title' ? { ...post, title: f } : { ...post, descr: f };
    })
    return searchPost
  }
}, [serchBy]);

  const truncate = (input) =>
    input?.length > 145 ? `${input.substring(0, 150)}...` : input;

  useEffect(() => {
    const getPosts = async () => {
      const param = category ? category : false;
      try {
        await scaffolding.load('post');
        const res = await api.post.getPosts(param);
        res.result ? setResult(res.result) :
          setError(res)
      } catch (error) {
        setError({ status: 'rejected', reason:error.message})
      }
    }
    getPosts();
  }, [category]);

  useEffect(() => {
    if (debounce.trim('') !== '') {
      const filteredPosts = result.filter(post =>
        post[`${serchBy}`].toLowerCase().includes(debounce.toLowerCase()));
      const res = search(debounce, filteredPosts)
      setPosts(() => res);
    } else setPosts(() => result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, debounce, serchBy]);

  useEffect(() => {
    const handleSearch = data => {
      setSearchValue(data.query);
      if (!data.searcValue) setSearchBy('title');
      else setSearchBy(data.searcValue);
    }
    
    emitter.on('search', handleSearch);
    return () => emitter.clear('search');
  }, []);

  return (
    error.status === 'rejected' ? 
    <h1 style={{textAlign:'center'}}>
      <span style={{color:'red'}}>{error.reason.code}</span> - {error.reason.message}
      </h1> :
      <>
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className='post' key={post.postid}>
            <div className='img'>
              <img src={post.image} alt='' />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.postid}`}>
               <h1>
                <div  dangerouslySetInnerHTML={{ __html: post.title }}/>
               </h1>
              </Link>
              <div style={{ margin: '' }}>
              <div  dangerouslySetInnerHTML={{ __html: truncate(post.descr) }}/>
              </div>
              <Link className='link' to={`/post/${post.postid}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>

        ))}
      </div>
    </div>
    </>
  )
})

export default Home