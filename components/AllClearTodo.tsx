import { KeyedMutator } from "swr"
import { Todo } from "@/pages"
import { ENDPOINT } from "@/pages"
import styles from "styles/AllClear.module.scss"


export const AllClear = ({mutate} : {mutate: KeyedMutator<Todo[]>}) => {

    const allClear = async () => {
        const update = await fetch( `${ENDPOINT}/api/todos/allclear`, { 
            method: "PUT",
        }).then((r) => r.json())
        
        mutate(update)
    } 

    return(
        <button 
        onClick={() => allClear()}
        className={styles.allclearbutton}
        >All Clear</button>
    )
} 