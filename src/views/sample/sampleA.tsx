import { useEffect } from "react"

export function SampleA(){

    useEffect(()=> {
        console.log('sampleA is render')
    }, [])

    return (
        <div>AAAA

            <input type="text" />
        </div>
    )
}