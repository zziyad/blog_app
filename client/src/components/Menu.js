import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import scaffolding from '../system/client';
const { api } = scaffolding;


const Menu = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        await scaffolding.load('post');
        const res = await api.post.getPosts(false);
        setPosts(res.result.sort(() => Math.random() - Math.random()).slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [])



  return (
    <div className='menu'>
      <h1>Other post you may like</h1>
      {posts?.map((post) => (
        <div className='post' key={post.postid}>
          <img src={post.image} alt='' />
          <h2>{post.title}</h2>
          <button onClick={() => navigate(`/post/${post.postid}`)}>Read more</button>
        </div>
      ))}
    </div>
  )
}

export default Menu