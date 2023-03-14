import { useState } from "react"
import { KeyedMutator } from "swr"
import { ENDPOINT } from "@/pages"
import { Todo } from "@/pages"
import { useForm } from "@mantine/form"
import styles from "../styles/AddTodo.module.scss"



export const AddTodo = ({ mutate }: {mutate : KeyedMutator<Todo[]>}) => {
    const [open, setOpen] = useState(false)

    const form  = useForm({
        initialValues: {
            title: "",
            text: "",
        },
    })

    const createTodo = async (values: {title: string, text: string}) => {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((r) => r.json())

        mutate(updated)
        form.reset()
        setOpen(false)
    }

    return (
        <div className={styles.container}>
            <div className={open ? styles.opened : styles.closed}>
                <form onSubmit={form.onSubmit(createTodo)}>
                    <label>Title
                    <input type="text" {...form.getInputProps("title")} />
                    </label>
                    <label>
                        Text
                        <textarea {...form.getInputProps("text")}></textarea>
                    </label>
                    <button type="submit" className={styles.createbutton}>Create Todo</button>
                    <button type="button" onClick={() => setOpen(false)}>Close</button>
                </form>
            </div>
                <button 
                onClick={() => setOpen(true)}
                className={ open ? styles.addbuttonopen : styles.addbuttonclose }
                >Add Todo</button>
        </div>
    )
}
