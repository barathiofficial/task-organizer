import { useApp } from '@/context/AppProvider'
import api from '@/lib/api'
import React, { FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Login() {
	const { setUser } = useApp()

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [isLogin, setIsLogin] = React.useState(true)

	function onEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value)
	}

	function onPassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value)
	}

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		let _email = email.trim().toLowerCase()

		if (!_email) {
			alert('Email required')
			return
		}

		if (!password) {
			alert('Password required')
			return
		}

		api.post(`auth/${isLogin ? 'login' : 'signup'}`, { email: _email, password })
			.then((res) => {
				setUser?.(res.data)
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

	return (
		<React.Fragment>
			<form onSubmit={submit}>
				<label htmlFor='email'>Email</label>
				<Input
					type='email'
					name='email'
					id='email'
					placeholder='Enter email'
					className='mb-4'
					value={email}
					onChange={onEmail}
				/>

				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					name='password'
					id='password'
					placeholder='Enter password'
					className='mb-4'
					value={password}
					onChange={onPassword}
				/>

				<Button className='mb-4'>{isLogin ? 'Login' : 'Signup'}</Button>

				<p onClick={() => setIsLogin(!isLogin)}>
					<span>{isLogin ? "Don't have an account?" : 'Already have an account'}</span>
					<span className='underline'>{isLogin ? 'Signup' : 'Login'}</span>
				</p>
			</form>
		</React.Fragment>
	)
}
