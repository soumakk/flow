import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ColorPicker from '@/components/widgets/ColorPicker'
import { StatusColors } from '@/lib/atoms'
import { useAddTag } from '@/services/mutation'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function AddTagForm() {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { mutate } = useAddTag()
	const form = useForm({
		defaultValues: {
			name: '',
			color: '',
		},
		onSubmit: ({ value }) => {
			mutate(
				{
					name: value.name,
					color: value.color,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['tags'] })
						setOpen(false)
						form.reset()
					},
				}
			)
		},
	})
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button>Add Tag</Button>
			</PopoverTrigger>
			<PopoverContent align="start">
				<form
					className="flex flex-col gap-5"
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<div className="flex flex-col gap-2">
						<form.Field
							name="name"
							validators={{
								onSubmit: ({ value }) => {
									if (!value) {
										return 'Required'
									}
								},
							}}
						>
							{(field) => (
								<>
									<Label htmlFor={field.name}>Tag name</Label>
									<Input
										type="text"
										placeholder="Tag name"
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<p className="text-destructive text-xs">
										{field.state.meta.errors?.join(',')}
									</p>
								</>
							)}
						</form.Field>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Color</Label>
						<form.Field
							name="color"
							validators={{
								onSubmit: ({ value }) => {
									if (!value) {
										return 'Required'
									}
								},
							}}
						>
							{(field) => (
								<>
									<ColorPicker
										colors={StatusColors}
										color={field.state.value}
										onColorChange={(color) => field.handleChange(color)}
									/>

									<p className="text-destructive text-xs">
										{field.state.meta.errors?.join(',')}
									</p>
								</>
							)}
						</form.Field>
					</div>

					<Button type="submit">Save</Button>
				</form>
			</PopoverContent>
		</Popover>
	)
}
