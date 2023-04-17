import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import scaffolding from '../system/client';
import { AuthContext } from '../context/authContext';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const { api } = scaffolding;


const Single = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const [, , postid] = useLocation().pathname.split('/');

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {

    const getPost = async () => {
      try {
        await scaffolding.load('post');
        const res = await api.post.getPost(postid);
        setPost(res.result);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [postid])

  const Delete = async (id) => {

    try {
      await scaffolding.load('post');
      await api.post.deletePost(id);
      alert('Your Post was Deleted');
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const handelDelete = async (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this post.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Delete(id)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }


  const postedDate = new Date(post.date).toString().substr(0, 21);

  return (
    <div className='single'>
      <div className='content'>
        <img src={post.image} alt='' />
        <div className='user'>
          <img src='https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted: {postedDate}</p>
          </div>

          {!!currentUser && currentUser.username === post.username ? <div className='edit'>
            <Link to={`/write?edit=${postid}`} state={post}>
              <img src='/image/edit.png' alt='' />
            </Link>
            <button
              style={{ border: 'none', backgroundColor: 'white' }}
              onClick={() => handelDelete(postid)}
            >
              <img src='/image/delete.png' alt='' />
            </button>
          </div> : <></>}
        </div>
        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.descr }} />
      </div>
      <div className='menu'>
        <Menu />
      </div>
    </div>
  )
}

export default Single