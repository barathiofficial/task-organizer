import React from 'react'

type User = {
	access_token: string
	user: {
		id: string
		email: string
		name: string | null
		createdAt: string
		updatedAt: string
	}
}

type Context = {
	user?: User | null
	setUser?: React.Dispatch<React.SetStateAction<User | null>>
}

const context = React.createContext<Context>({})

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
	const storedValue = localStorage.getItem(key)

	const initialValueJSON = storedValue ? JSON.parse(storedValue) : initialValue

	const [value, setValue] = React.useState(initialValueJSON)

	React.useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

function AppProvider(props: React.PropsWithChildren) {
	const [user, setUser] = useLocalStorage<User | null>('user', null)

	console.log(user)

	return <context.Provider value={{ user, setUser }}>{props.children}</context.Provider>
}

export function useApp() {
	return React.useContext(context)
}

export default AppProvider
