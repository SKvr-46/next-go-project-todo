import { KeyedMutator, mutate } from "swr"
import { ENDPOINT } from "@/pages"
import { useForm } from "@mantine/form"
import { Todo } from "@/pages"

export const DeleteTodo = ({mutate} : {mutate: KeyedMutator<Todo[]>}) => {

    const form = useForm({
        initialValues: {
            id: ""
        }
    })

    const deleteitem = async (values: {id : number | string}) => {
        const updated = await fetch(`${ENDPOINT}/api/todos/${values.id}/delete`, {
            method: 'DELETE',
        }).then((r) => r.json())
        mutate(updated)
        form.reset()
    }

    return(
        <div>
            <h1>Delete Todo</h1>
            <form onSubmit={form.onSubmit(deleteitem) }>
                <input {...form.getInputProps("id")} />
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}