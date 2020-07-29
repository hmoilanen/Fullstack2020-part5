import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (blog) => {
	const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token }` || null
	const config = {
		headers: { Authorization: token }
	}

	const request = axios.post(baseUrl, blog, config)
	return request.then(response => response.data)
}

const remove = (blog) => {
	const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token }` || null
	const config = {
		headers: { Authorization: token }
	}

	const request = axios.delete(`${baseUrl}/${blog.id}`, config)
	return request.then(response => response.data)
}

export default {
	getAll,
	create,
	remove
}