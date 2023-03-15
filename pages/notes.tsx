import useSWR from "swr"

export const NOTESENDPOINT  = "http://localhost:4000"
const fetcher = (url:string) => fetch(`${NOTESENDPOINT}/${url}`).then(r => r.json())

export interface Note {
    id: number
    title: string
    content: string
}

const Notes = () => {
    const {data, mutate} = useSWR(NOTESENDPOINT, fetcher)

    return(
        <>
            <p>hello</p>
            <h1>{JSON.stringify(data)}</h1>
        </>
    )
}

export default Notes