import useSWR from "swr"
import styles from "styles/App.module.scss"
import { AddTodo } from '@/components/AddTodo'
import { DeleteTodo } from '@/components/DeleteTodo'
import { AllClear } from "@/components/AllClearTodo"


export const ENDPOINT = "http://localhost:4000"
const fetcher  = (url:string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json())  //レスポンスをjsonに変換

export interface Todo {
	id:number    
  date:string
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
    <div className={styles.container}>
    <div>
      <ul>
      {data?.map((todo) =>(
        <li 
        key={`todo__${todo.id}`}
        onClick={() => markTodo(todo.id)}
        >
          <div>
            <p>#{todo.id} at {todo.date}</p>
            <p
            className={todo.completed ? styles.completed : styles.uncompleted}
            > {todo.title}___{todo.text}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
    <AddTodo mutate={mutate}/>
    <DeleteTodo mutate={mutate}/>
    <AllClear mutate={mutate}/>
    </div>
  )
}

export default App
