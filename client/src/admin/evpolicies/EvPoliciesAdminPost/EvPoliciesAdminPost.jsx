import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill-with-table'
import 'react-quill/dist/quill.snow.css'
import { useLocation } from 'react-router-dom'
import { Axios } from '../../../Utility'
import './evPoliciesAdminPost.scss'
import { Context } from '../../../context/Context'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['list'],
    ['clean']['code-block'],
  ],
}
const formats = [
  'header',
  'size',
  'font',
  'strike',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'code-block',
]

const TrendingAdminPost = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const { user } = useContext(Context)

  const [post, setPost] = useState({})

  // ----FOR Update
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    const GetPost = async () => {
      const res = await Axios.get(`/evpolicies/${path}`)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      console.log(post, 'Hello')
    }
    GetPost()
  }, [path])

  // Delete Trending Post

  const handleDelete = async () => {
    try {
      await Axios.delete(`/evpolicies/${path}`, {
        data: { username: user.username },
      })
      window.location.replace('/admin')
    } catch (error) {
      console.log('Cant Delete The Trending Post')
    }
  }

  // Update Trending Post

  const handleUpdate = async () => {
    try {
      const res = await Axios.put(`/evpolicies/${path}`, {
        username: user.username,
        title,
        desc,
      })
      // window.location.reload()
      console.log(res)
      setUpdateMode(false)
    } catch (error) {
      console.log('Unable to Update Trending Post')
    }
  }

  return (
    <>
      <div className='lnBlog'>
        <div className='deleteEdit'>
          {updateMode ? (
            <div>
              <button onClick={(e) => setUpdateMode(false)}>Cancle</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          ) : (
            <div>
              <button onClick={(e) => setUpdateMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
        <div className='lnHead'>
          {updateMode ? (
            <input
              className='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className='title'>{title}</h1>
          )}
          <div className='lncatAndDate'>
            <p className='lndate'>{new Date(post.createdAt).toDateString()}</p>
          </div>
        </div>
        {post.photo && (
          <div className='lnImgDiv'>
            <img src={post.photo} alt={title} />
          </div>
        )}

        <div className='lndescAndShare'>
          {updateMode ? (
            <ReactQuill
              placeholder='Tell your story...'
              formats={formats}
              modules={modules}
              className='writeInput writeText'
              value={desc}
              onChange={(e) => setDesc(e)}
            ></ReactQuill>
          ) : (
            <div
              className='lndesc'
              dangerouslySetInnerHTML={{
                __html: `${desc}`,
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  )
}

export default TrendingAdminPost
