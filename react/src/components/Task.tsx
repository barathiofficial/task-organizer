import { cn } from '@/lib/utils'

type TaskProps = {
	text?: string
	checked?: boolean
}

export default function Task(props: TaskProps) {
	return (
		<div className='border border-slate-300 px-3 py-2 cursor-pointer hover:bg-slate-100 hover:shadow-sm flex items-center gap-3'>
			<span
				className={cn('inline-block w-3 h-3 rounded-full shrink-0 border border-slate-400', {
					'bg-black': props.checked,
					'bg-transparent': !props.checked
				})}
			></span>
			<span className='truncate text-xs font-medium'>{props.text}</span>
		</div>
	)
}
