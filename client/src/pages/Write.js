import 'react-quill/dist/quill.snow.css';
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';
import MyInput from '../components/UI/input/MyInput.js';
import { AuthContext } from '../context/authContext.js';
import scaffolding from '../system/client';

const { api } = scaffolding;

const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  // State variables for the form data
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || '');
  const [error, setError] = useState({ status: '', reason: null});
  const [value, setValue] = useState(state?.descr || '');

  // Reads the selected file and calls the callback with the result
  const readFile = (file, callback) => {
    const fr = new FileReader();
    fr.onload = () => callback(null, fr.result);
    fr.onerror = (err) => setError(err);
    fr.readAsDataURL(file);
  }

  // Uploads the post to the server
  const uploadPost = async (post) => {
    console.log({ post });
    await scaffolding.load('post');
    const method = state ? api.post.updatePost : api.post.addPost;
    try {
      const pid = await method(post);
      navigate(`/post/${state ? state.postid : pid.result}`);
    } catch (error) {
      setError({ status: 'rejected', reason:error.message})
    }
  }

  const handleSend = async (event) => {
    event.preventDefault();
    if (!currentUser) return alert('Need to login');
    if (!title.trim()) return alert('No title provided');
    if (!value.trim()) return alert('No text provided');

    const post = {
      postId: state?.postid,
      title: title,
      descr: value,
      category: category,
      uid: currentUser?.userid,
      image: 'no photo'
    };

    if (file) {
      readFile(file, async (err, res) => {
        if (err) return setError(err);
        try {
          await scaffolding.load('upload');
          const call = await api.upload.file({ name: file.name, data: res });
          if (call.status === 'rejected') return setError(call.result);
          post.image = call.result;
          await uploadPost(post);
        } catch (error) {
          setError(error);
        }
      });
    } else {
      try {
        if (!!state) delete post.image
        await uploadPost(post);
      } catch (error) {
        setError(error);
      }
    }
  };



  return (
    error.status === 'rejected' ? 
    <h1 style={{textAlign:'center'}}>
      <span style={{color:'red'}}>{error.reason.code}</span> - {error.reason.message}
      </h1> :
    <div className='add'>
      <div className='content'>
        <input type='text' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        <div className='editorContainer'>
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type='file' name='' id='file' onChange={(e) => setFile(e.target.files[0])} />
          <div style={{ padding: '10px 10px 10px 0' }}>
            <button className='button'>
              <label htmlFor='file'>Upload Image</label>
            </button>
          </div>
          <div className='buttons'>
            {/* <button className='bfc'>Save as draft</button> */}
            <button className='blc' onClick={(e) => handleSend(e)}>Update</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'art'}
              name='category'
              value='art' id='art'
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'science'}
              name='category'
              value='science'
              id='science' onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'technology'}
              name='category'
              value='technology'
              id='technology'
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'cinema'}
              name='category'
              value='cinema'
              id='cinema'
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'design'}
              name='category'
              value='design'
              id='design'
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
            <MyInput
              className='myInp'
              type='radio'
              checked={category === 'food'}
              name='category'
              value='food'
              id='food'
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor='food'>Food</label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Write;





