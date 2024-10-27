import { Link } from "react-router-dom"

export function Page404() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <span>页面不存在</span>
            <div>
                <Link to={'/'} className="text-[#50d71e]" >返回首页</Link>
            </div>
        </div>
    )
}