import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
//import Axios from 'axios'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
	}, [])

  useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser') || null
		if (loggedUser) {
			setUser(JSON.parse(loggedUser))
		}
    /* loginService.getAll().then(blogs =>
      setBlogs( blogs )
    )   */
	}, [])
	
	const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
			})
			console.log(user);

			window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
			console.log(exception);
      /* setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) */
    }
	}

	const handleLogout = async () => {
		try {
      const response = await loginService.logout()
			console.log(response)

			window.localStorage.removeItem('user')

      setUser(null)
    } catch (exception) {
			console.log(exception);
    }
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
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
  )

  return (
    <div>
			<h2>{ user === null ? 'Login' : 'Blogs' }</h2>
			{user === null
				? loginView()
				: blogView()
			}
    </div>
  )
}

export default App