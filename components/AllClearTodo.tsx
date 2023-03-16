import { KeyedMutator } from "swr"
import { Todo } from "@/pages"
import { ENDPOINT } from "@/pages"
import styles from "styles/AllClearTodo.module.scss"


export const AllClearTodo = ({mutate} : {mutate: KeyedMutator<Todo[]>}) => {

    const allClearTodo = async () => {
        const update = await fetch( `${ENDPOINT}/api/todos/allclear`, { 
            method: "PUT",
        }).then((r) => r.json())
        
        mutate(update)
    } 

    return(
        <button 
        onClick={() => allClearTodo()}
        className={styles.allclearbutton}
        >All Clear</button>
    )
} 