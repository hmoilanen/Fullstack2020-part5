import React, { useState, useEffect } from 'react'
import AddBlogs from './components/AddBlogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Feedback from './components/Feedback'
import blogService from './services/blogs'
import loginService from './services/login'
//import Axios from 'axios'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newFeedback, setNewFeedback] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
	}, [])
	//console.log(blogs);

  useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser') || null
		if (loggedUser) {
			setUser(JSON.parse(loggedUser))
		}
	}, [])

	const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
			})
			//console.log(user)

			setFeedback({ message: `(${user.username}) logged in!`, success: true })

			window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
			console.log(exception);
			setFeedback({ message: `Login failed: ${exception}`, success: false })
    }
	}

	const handleLogout = async () => {
		try {
			setFeedback({ message: `Logged out!`, success: true })
			window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (exception) {
			console.log(exception)
			setFeedback({ message: `Problem logging out: ${exception}`, success: false })
    }
	}

	const addBlog = (blogToAdd) => {
		setBlogs(blogs.concat(blogToAdd))
	}

	const setFeedback = (feedback) => {
    const delay = feedback && feedback.delay
    ? feedback.delay
    : 3000
    
    setNewFeedback(feedback)

    setTimeout(() => {
      setNewFeedback(false)
    }, delay);
  }
	
	const loginView = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
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
	
	const blogView = () => (
		<div>
			<div>
				logged in as {user.username}
				<button
					onClick={handleLogout}
				>logout</button>
			</div>
			<br/>
			<Togglable buttonText="new note">
				<AddBlogs
					addBlog={addBlog}
					setFeedback={setFeedback}
				/>
			</Togglable>
			<br/>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
  )

  return (
    <div>
			<h2>{ user === null ? 'Login' : 'Blogs' }</h2>
			<Feedback newFeedback={newFeedback}/>
			{user === null
				? loginView()
				: blogView()
			}
    </div>
  )
}

export default App