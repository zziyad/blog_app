import React from 'react'
import { Link } from 'react-router-dom';

function Post({ data, error, status }) {

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const truncate = (input) =>
    input?.length > 300 ? `${input.substring(0, 104)}...` : input;

  const posts = data.result;

  return (
    status === 'rejected' ? <div>{error}</div>
      : status === 'pending' ? <div className="loading"></div>
        : status === 'fulfilled' ? (
          <>
            <div className='posts'>
              {posts?.map((post) => (
                <div className='post' key={post.postid}>
                  <div className='img'>
                    <img src={post.image} alt='' />
                  </div>
                  <div className='content'>
                    <Link className='link' to={`/post/${post.postid}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <div style={{ margin: '15px' }}>
                      {truncate(getText(post.descr))}
                    </div>
                    <Link className='link' to={`/post/${post.postid}`}>
                      <button>Read more</button>
                    </Link>
                  </div>
                </div>

              ))}
            </div>
          </>
        ) : null
  )
}

export default Post