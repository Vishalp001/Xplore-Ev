import { useContext, useState } from 'react'
import './writeVideoPost.scss'
import axios from 'axios'
import { Context } from '../../../context/Context'

export default function WriteVideoPost() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newVideoPost = {
      username: user.username,
      title,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      newVideoPost.photo = filename
      try {
        await axios.post('/upload', data)
      } catch (error) {
        console.log('Cant Upload the Photo')
      }
    }
    try {
      const res = await axios.post('/video', newVideoPost)
      window.location.replace('/video_admin_post/' + res.data._id)
    } catch (error) {
      console.log('Cant Upload the Video Post')
    }
  }
  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='writeIcon fas fa-plus'></i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button className='writeSubmit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  )
}