import React, { useState } from 'react'
import PropTypes from 'prop-types'
//import blogService from '../services/blogs'

//const AddBlogs = ({ addBlog, setFeedback }) => {
const AddBlogs = ({ addBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleAddingBlog = async (event) => {
		event.preventDefault()

		const blogToAdd = {
			title: title,
			author: author,
			url: url
		}

		addBlog(blogToAdd)

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<form onSubmit={handleAddingBlog}>
			<h4>Create new blog</h4>
			<div>
				title:
				<input
					id='title'
					type='text'
					value={title}
					name='Title'
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					id='author'
					type='text'
					value={author}
					name='Author'
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					id='url'
					type='text'
					value={url}
					name='Url'
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type='submit'>add blog</button>
		</form>
	)
}

AddBlogs.propTypes = {
	addBlog: PropTypes.func.isRequired,
	//setFeedback: PropTypes.func.isRequired
}

export default AddBlogs
