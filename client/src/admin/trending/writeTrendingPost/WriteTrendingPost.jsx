import { useContext, useState } from 'react'
import './writeTrendingPost.scss'
import ReactQuill from 'react-quill-with-table'
import 'react-quill/dist/quill.snow.css'
import { Axios } from '../../../Utility'
import { Context } from '../../../context/Context'
import dotLoader from '../../../assets/images/dotLoader.svg'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['list'],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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

export default function WriteTrendingPost() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [categories, setCategories] = useState('')
  const [file, setFile] = useState(null)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault()
    const newTrendingPost = {
      username: user.username,
      title,
      desc,
      categories,
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name', filename)
      data.append('file', file)
      console.log(data)
      try {
        const res = await Axios.post('/upload', data)
        newTrendingPost.photo = res.data.url
      } catch (error) {
        console.log('Cant Upload the Photo')
      }
    }
    try {
      const res = await Axios.post('/trending', newTrendingPost)
      window.location.replace('/trending_admin_post/' + res.data._id)
      setLoader(false)
    } catch (error) {
      console.log('Cant Upload the Trending Post')
    }
  }
  return (
    <>
      <div className='write'>
        {file && (
          <img
            className='writeImg'
            src={URL.createObjectURL(file)}
            alt='writeImg'
          />
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
            <input
              type='text'
              placeholder='categories'
              className='writeInput'
              autoFocus={true}
              onChange={(e) => setCategories(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            <ReactQuill
              placeholder='Tell your story...'
              formats={formats}
              modules={modules}
              className='writeInput writeText'
              value={desc}
              onChange={(e) => setDesc(e)}
            ></ReactQuill>
          </div>
          {loader ? (
            <button className='btnLoading'>
              <img className='' src={dotLoader} alt='dotLoader' />
            </button>
          ) : (
            <button className='writeSubmit' type='submit'>
              Publish
            </button>
          )}
        </form>
      </div>
    </>
  )
}
