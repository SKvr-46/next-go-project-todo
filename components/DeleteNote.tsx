import Notes, { Note } from "@/pages/notes";
import { NOTESENDPOINT } from "@/pages/notes";
import { KeyedMutator}  from "swr";
import { useForm } from "@mantine/form";
import styles from "styles/DeleteNote.module.scss"

export const DeleteNote = ({mutate} : {mutate: KeyedMutator<Note[]>}) => {

    const deleteNote = async (values :{id: number | string}) => {

        const updated = await fetch(`${NOTESENDPOINT}/api/notes/${values.id}/delete`, {
            method: 'DELETE',
        }).then((r) => r.json())

        mutate(updated)
        form.reset()
    }

    const form = useForm({
        initialValues: {
            id: ""
        }
    })


    return(
        <div className={styles.container}> 
            <form onSubmit={form.onSubmit(deleteNote)}>
                <label>
                Delete Note
                <input {...form.getInputProps("id")}/>
            </label>
            <button type="submit">Delete Note</button>
            </form>
        </div>

    )

}