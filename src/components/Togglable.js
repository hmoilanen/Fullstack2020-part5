import React, { useState } from 'react'

const Togglable = (props) => {
	const [enabled, setEnabled] = useState(false)

	const toggleEnabled = () => {
		setEnabled(!enabled)
	}

	if (enabled) {
		return (
			<div>
				<button onClick={toggleEnabled}>{props.buttonText}</button>
			</div>
		)
	}

  return (
		<div>
			{props.children}
			<button onClick={toggleEnabled}>cancel</button>
		</div>
	)
}


export default Togglable
