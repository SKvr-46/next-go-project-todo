import { KeyedMutator } from "swr"
import { Note } from "@/pages/notes"
import { NOTESENDPOINT } from "@/pages/notes"
import styles from "styles/AllClearNote.module.scss"


export const AllClearNote = ( { mutate} : {mutate: KeyedMutator<Note[]>}) => {

    const allClearNote = async ()  => {
        const updated = await fetch (`${NOTESENDPOINT}/api/notes/allclear`, {
            method: "PUT",
        }).then((r) => r.json())

        mutate(updated)
    }

    return(
        <div>
            <button
            onClick={() => allClearNote()}
            className={styles.allclearbutton}
            >All Clear</button>
        </div>
        
    )
} 