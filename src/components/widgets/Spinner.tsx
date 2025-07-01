import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

export default function Spinner({ className }: { className?: string }) {
	return (
		<div className={cn('grid place-self-center py-10', className)}>
			<Loader className="animate-spin h-5 w-5" />
		</div>
	)
}
