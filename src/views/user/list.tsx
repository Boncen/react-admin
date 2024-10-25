import { Link } from "react-router-dom";

export function UserList(){

    return (
        <div>UserList
            <Link to={'/system/user/1234'} >用户详情</Link>
        </div>
    )
}