import Login from './components/Login'
import Tasks from './components/Tasks'
import { useApp } from './context/AppProvider'

function App() {
	const { user } = useApp()

	return (
		<main className='container pt-4'>
			<h1 className='text-3xl font-bold mb-2'>{user ? 'Tasks' : 'Login/Signup'}</h1>
			{user ? <Tasks /> : <Login />}
		</main>
	)
}

export default App
