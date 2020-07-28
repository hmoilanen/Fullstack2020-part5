import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogs = ({ blogs, setBlogs }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleAddingBlog = async (event) => {
		event.preventDefault()
		try {
			const blogToAdd = {
				title: title,
				author: author,
				url: url
			}

			const createdBlog = await blogService.create(blogToAdd)
			setBlogs(blogs.concat(createdBlog))

			setTitle('')
			setAuthor('')
			setUrl('')
		} catch (exception) {
			console.log(exception)
    }
	}

	return (
		<form onSubmit={handleAddingBlog}>
			<h4>Create new blog</h4>
			<div>
				title: 
				<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author: 
				<input
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url: 
				<input
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">add blog</button>
		</form>
	)
}

export default AddBlogs
