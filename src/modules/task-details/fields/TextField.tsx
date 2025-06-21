import React, { useState } from 'react'

interface TextFieldProps extends React.ComponentProps<'input'> {
	onSave: (value: string) => void
	defaultValue: string
	className?: string
	placeholder?: string
}

export default function TextField({
	onSave,
	defaultValue,
	className,
	placeholder,
	...rest
}: TextFieldProps) {
	const [text, setText] = useState(defaultValue)
	return (
		<input
			className={className}
			defaultValue={defaultValue}
			onBlur={() => onSave(text)}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					onSave(text)
				}
			}}
			value={text}
			onChange={(e) => setText(e.target.value)}
			placeholder={placeholder}
			{...rest}
		/>
	)
}
