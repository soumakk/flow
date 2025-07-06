import React from 'react'

interface CircularProgressProps {
	size?: number
	strokeWidth?: number
	progress: number // 0 to 100
	color?: string
	bgColor?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
	size = 100,
	strokeWidth = 10,
	progress,
	color = '#1976D2',
	bgColor = '#e0e0e0',
}) => {
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (progress / 100) * circumference

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size + 1} ${size + 1}`}>
			<circle
				stroke="var(--border)"
				fill="none"
				strokeWidth={strokeWidth}
				cx={size / 2}
				cy={size / 2}
				r={radius}
			/>
			<circle
				stroke="var(--primary)"
				fill="none"
				strokeWidth={strokeWidth}
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
				style={{
					transition: `stroke-dashoffset 400ms ease-out`,
				}}
			/>
		</svg>
	)
}

export default CircularProgress
