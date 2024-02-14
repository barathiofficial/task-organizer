import Task from './components/Task'
import { Button } from './components/ui/button'

function App() {
	return (
		<main className='container pt-4'>
			<h1 className='text-3xl font-bold mb-2'>Tasks</h1>
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Task text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea distinctio enim corrupti libero veniam voluptatem alias reiciendis, labore ducimus rerum architecto fugiat dolorum perspiciatis officia dolorem natus, placeat minima.' />
			<Button className='w-full mt-2'>Add new</Button>
		</main>
	)
}

export default App
