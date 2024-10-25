import { Link, useRouteError } from "react-router-dom"

export function Page500() {
    const error: any = useRouteError();
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <span>有错误发生: {error.message}</span>
            <div>
                <Link to={'/'} className="text-[#50d71e]" >返回首页</Link>
            </div>
        </div>
    )
}