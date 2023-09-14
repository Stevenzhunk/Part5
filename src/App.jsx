import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Create from './components/Create';

const Notification = ({ message, selector }) => {
  if (message === null) {
    return null;
  }
  return (
    <>
      {selector ? (
        <div className="done">
          {message}
        </div>
      ) : (
        <div className="error">
          {message}
        </div>
      )}
    </>
  );
};
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName]=useState('')
  const [password,setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [selector, setSelector] = useState(false)
  const [message, setMessage] = useState(null)
  const [logvisibility, setLogVisibility] =useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const Logout =()=>{
    window.localStorage.clear()
    location.reload();
  }
  const onSumitCreate=(event)=>{  
    event.preventDefault();
    const blogObject = {
      title:title,
      author:author,
      url:url
    }
    blogService.create(blogObject)
    .then(resblog=>{
      setBlogs(blogs.concat(resblog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSelector(true)
      setMessage(
        `Added ${blogObject.title} by ${user.username}`
        ) 
        setTimeout(() => {
          setMessage(null)
       }, 4000)
    })
  }
  const handleLogin = async(event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleVisibleTrue=async(event)=>{
    event.preventDefault()
    setLogVisibility(true)
  }

  const handleVisibleFalse=(event)=>{
    event.preventDefault()
    setLogVisibility(false)
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h1>log in the aplication</h1>
      </div>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <h3>{user.username} have logged in</h3>
      <button onClick={Logout}>log out</button>
      <Create
        title={title}
        author={author}
        url={url}
        onSumitCreate={onSumitCreate}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        logvisibility={logvisibility}
        handleVisibleTrue={handleVisibleTrue}
        handleVisibleFalse={handleVisibleFalse}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} 
    </div> 
  )
  
  
  return (
    <div>
      <Notification message={message} selector={selector}/>
      {user === null ?
      loginForm() :
      blogForm()
    }
    </div>
  )
}

export default App