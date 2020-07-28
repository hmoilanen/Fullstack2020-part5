import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component
	const blog = {
		title: 'test title',
		author: 'test author',
		url: 'test url',
		likes: 0
	}

	beforeEach(() => {
		component = render(
			<Blog blog={blog} />
		)
	})

	test('renders its children', () => {
		expect(
			component.container.querySelector('.blogVisible')
		).toBeDefined()
	})

	test('at start the toggleable is not displayed', () => {
		expect(
			component.container.querySelector('.blogToggleable')
		).toBeNull()
	})

	test('after clicking the button, toggleable is displayed', () => {
		const button = component.container.querySelector('.blogToggler')
		fireEvent.click(button)

		expect(
			component.container.querySelector('.blogToggleable')
		).toBeDefined()
	})

	test('after clicking the button twice, toggleable is not displayed', () => {
		const button = component.container.querySelector('.blogToggler')
		fireEvent.click(button)
		fireEvent.click(button)

		expect(
			component.container.querySelector('.blogToggleable')
		).toBeNull()
	})

	test('show url and likes correctly when blog is toggled', () => {
		const button = component.container.querySelector('.blogToggler')
		fireEvent.click(button)

		const toggleable = component.container.querySelector('.blogToggleable')

		expect(toggleable).toHaveTextContent(blog.url)
		expect(toggleable).toHaveTextContent(blog.likes)
	})
})