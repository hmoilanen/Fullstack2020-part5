import React, { useState, useEffect } from 'react'
import AddBlogs from './components/AddBlogs'
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
	}, [])
	console.log(blogs)
	const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
			})
			//console.log(user)

			window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
			console.log(exception);
    }
	}

	const handleLogout = async () => {
		try {
			window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (exception) {
			console.log(exception)
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
			<AddBlogs
				blogs={blogs}
				setBlogs={setBlogs}
			/>
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