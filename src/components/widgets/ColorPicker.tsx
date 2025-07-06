export default function ColorPicker({
	colors,
	color,
	onColorChange,
}: {
	colors: string[]
	color: string
	onColorChange: (color: string) => void
}) {
	return (
		<div className="flex flex-wrap items-center justify-center gap-1">
			{colors?.map((c) => (
				<button
					type="button"
					className="h-6 w-6 rounded-full cursor-pointer active:scale-80 transition-all duration-100"
					onClick={() => onColorChange(c)}
					style={{
						backgroundColor: color === c ? 'transparent' : c,
						border: color === c ? `5px solid ${c}` : 'none',
					}}
				></button>
			))}
		</div>
	)
}
