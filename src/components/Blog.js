import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
	const [showAll, setShowAll] = useState(false)

	const styling = {
		border: '2px solid black',
		marginBottom: '4px',
		padding: '4px'
	}

	return (
		<div style={styling}>
			<div className='blogVisible'>
				{blog.title}
				<button
					onClick={() => setShowAll(!showAll)}
					className='blogToggler'
				>view</button>
				<div>{blog.author}</div>
			</div>
			{!showAll ?
				false :
				<div className='blogToggleable'>
					<div>
						{blog.url}
						<button
							onClick={() => addLike()}
							className='blogLike'
						>like</button>
					</div>
					<div>{blog.likes}</div>
				</div>
			}
		</div>
	)
}

export default Blog





