import { useApp } from '@/context/AppProvider'
import api from '@/lib/api'
import React from 'react'
import Task from './Task'
import { Button } from './ui/button'
import { Input } from './ui/input'

type TTask = {
	id: string
	title: string
	status: string
	userId: string
	createdAt: string
	updatedAt: string
}

export default function Tasks() {
	const [showInput, setShowInput] = React.useState(false)
	const [task, setTask] = React.useState('')
	const [tasks, setTasks] = React.useState<TTask[]>([])

	const { user } = useApp()

	function onAddNew() {
		setShowInput(true)
	}

	function onTask(e: React.ChangeEvent<HTMLInputElement>) {
		setTask(e.target.value)
	}

	function onAdd() {
		setTask('')
		setShowInput(false)

		const _task = task.trim()

		if (!_task) {
			alert('Enter task')
			return
		}

		api.post('tasks', { title: _task }, { headers: { Authorization: `Bearer ${user?.access_token}` } })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				if (err.response) {
					const message = err.response.data?.message

					if (typeof message === 'string') {
						alert(message)
					} else if (Array.isArray(message)) {
						message.map((obj) => {
							alert(obj.error)
						})
					}

					return
				}
				alert(err.message)
			})
	}

	React.useEffect(() => {
		function getTasks() {
			api.get('tasks', {
				headers: {
					Authorization: `Bearer ${user?.access_token}`
				}
			})
				.then((res) => {
					console.log(res.data)

					setTasks(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
		}

		getTasks()
	}, [])

	return (
		<React.Fragment>
			{tasks.map((task) => {
				return <Task key={task.id} text={task.title} />
			})}
			{showInput ? (
				<div className='flex items-center'>
					<Input type='text' autoFocus placeholder='Enter task...' onChange={onTask} value={task} />
					<Button className='shrink-0' onClick={onAdd}>
						Add
					</Button>
				</div>
			) : (
				<Button className='w-full mt-2' onClick={onAddNew}>
					Add new
				</Button>
			)}
		</React.Fragment>
	)
}
