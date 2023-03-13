import useSWR from "swr"
import { AddTodo } from '@/components/AddTodo'
import { DeleteTodo } from '@/components/DeleteTodo'

export const ENDPOINT = "http://localhost:4000"
const fetcher  = (url:string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json())  //レスポンスをjsonに変換

export interface Todo {
	id:number    
	title:string 
	text:string 
	completed:boolean
}

const App = () => {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher)

  const markTodo = (id:number) => {
    const updated = fetch(`${ENDPOINT}/api/todos/${id}/completed`, {
      method: "PATCH",
    }).then((r) =>r.json())

    mutate(updated)
  }

  return (
    <div>
    <div>
      <ul>
      {data?.map((todo) =>(
        <li 
        key={`todo__${todo.id}`}
        onClick={() => markTodo(todo.id)}
        >
        {todo.id}:{todo.title} ~ {todo.text}
        </li>
      ))}
      </ul>
    </div>
    <AddTodo mutate={mutate}/>
    <DeleteTodo mutate={mutate}/>
    </div>
  )
}

export default App
