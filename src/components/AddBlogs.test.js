import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogs from './AddBlogs'

// see: https://jestjs.io/docs/en/using-matchers

describe('<AddBlogs />', () => {
	let component

	const mockHandler = jest.fn()

	beforeEach(() => {
		component = render(
			<AddBlogs addBlog={mockHandler} />
		)
	})

	test('form calls event handler with right details / data', () => {
		const blog = {
			title: 'test title',
			author: 'test author',
			url: 'test url',
			likes: 0
		}

		const title = component.container.querySelector('#title')
		const author = component.container.querySelector('#author')
		const url = component.container.querySelector('#url')

		fireEvent.change(title, { target: { value: blog.title } })
		fireEvent.change(author, { target: { value: blog.author } })
		fireEvent.change(url, { target: { value: blog.url } })

		const button = component.container.querySelector('button')
		fireEvent.click(button)

		expect(mockHandler.mock.calls).toHaveLength(1)

		expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
		expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
		expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
	})
})