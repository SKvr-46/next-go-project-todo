import { json } from "stream/consumers"
import useSWR from "swr"

export const NOTESENDPOINT  = "localhost:3000/notes"
const fetcher = (url:string) => fetch(`${NOTESENDPOINT}/${url}`).then(r => r.json())

export interface Note {
    id: number
    title: string
    content: string
}

const Notes = () => {
    const {data, mutate} = useSWR(NOTESENDPOINT, fetcher)

    return(
        <h1>{JSON.stringify(data)}</h1>
    )
}

export default Notes