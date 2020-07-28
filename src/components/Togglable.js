import React, { useState } from 'react'

const Togglable = (props) => {
	const [enabled, setEnabled] = useState(false)

	const toggleEnabled = () => {
		setEnabled(!enabled)
	}

	if (enabled) {
		return (
			<div>
				{props.children}
				<button onClick={toggleEnabled}>cancel</button>
			</div>
		)
	}

  return (
		<div>
			<button onClick={toggleEnabled}>{props.buttonText}</button>
		</div>
	)
}


export default Togglable
