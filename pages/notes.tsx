import useSWR from "swr"
import { AddNote } from "@/components/AddNote"
import { DeleteNote } from "@/components/DeleteNote"
import styles from "styles/Notes.module.scss"


export const NOTESENDPOINT  = "http://localhost:4000"
const fetcher = (url:string) => fetch(`${NOTESENDPOINT}/${url}`).then(r => r.json())

export interface Note {
    id: number
    title: string
    content: string
}


const Notes = () => {
    const {data, mutate} = useSWR<Note[]>("api/notes", fetcher)
    const len = data?.length

    return(
        <div className={styles.container}>  
            <div className={len ? styles.listwrapper : styles.nonelistwrapper}>
            <ul>
            {data?.map((note) =>(
                <li 
                key={`todo__${note.id}`}
                >
                <div>
                    <p>#{note.id} {note.title}</p>
                    <p>{note.content}</p>
                </div>
                </li>
            ))}
            </ul>
            </div>
            <AddNote mutate={mutate}/>
            <DeleteNote mutate={mutate}/>
        </div>
    )
}

export default Notes


//swrを使わない場合
//  useEffect(() => {
    // const fetchData = async () => {
    //     const response = await fetch(`${NOTESENDPOINT}/api/notes`)
    //     const data = await response.json()
    //     setNotes(data)
    //   }
    //   fetchData()
    // }, [])