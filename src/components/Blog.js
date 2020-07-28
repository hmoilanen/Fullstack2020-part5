import React, { useState } from 'react'

const Blog = ({ blog }) => {
	const [showAll, setShowAll] = useState(false)

	const styling = {
		border: '2px solid black',
		marginBottom: '4px',
		padding: '4px'
	}

	return (
		<div style={styling}>
			<div>
				{blog.title}
				<button onClick={() => setShowAll(!showAll)}>view</button>
			</div>
			{!showAll ?
				false :
				<div>
					<div>{blog.author}</div>
					<div>
						{blog.url}
						<button>like</button>
					</div>
					<div>{blog.likes}</div>
				</div>
			}
		</div>
	)
}

export default Blog
