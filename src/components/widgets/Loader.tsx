import { cn } from '@/lib/utils'
import { Loader as Spinner } from 'lucide-react'

export default function Loader({ className }: { className?: string }) {
	return (
		<div className={cn('h-full w-full grid place-content-center', className)}>
			<Spinner className="h-5 w-5 text-primary animate-spin" />
		</div>
	)
}
