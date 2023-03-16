import styles from "styles/AddNote.module.scss"
import {useForm}  from "@mantine/form"
import { KeyedMutator } from "swr"
import { Note, NOTESENDPOINT } from "@/pages/notes"
import { useState } from "react"

export const AddNote = ({mutate}: {mutate: KeyedMutator<Note[]>}) => {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            content: "",
        }
    })

    const addNote = async (values : {title: string, content: string}) => {
        const updated = await fetch(`${NOTESENDPOINT}/api/notes`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((r) => r.json())

        form.reset()
        setOpen(false)
        mutate(updated)
    }

    return(
        <div className={styles.container}>
            <div className={open ? styles.opened : styles.closed}>
                <form onSubmit={form.onSubmit(addNote)}>
                <label>
                    Title
                    <input {...form.getInputProps("title")}/>
                </label>
                <label>
                    Content
                    <textarea {...form.getInputProps("content")}/>
                </label>
                <button type="submit">Create Note</button>
                </form>
            </div>

            <button 
            onClick={() => setOpen(true)}
            className={open ? styles.closed : styles.opened}
            >Add Note</button>
        </div>
    )
}