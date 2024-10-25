import { useParams } from "react-router-dom"

export function UserDetail() {
    const params = useParams();
    console.log(params)
    return (
        <div>UserDetail: {params.id}</div>
    )
}