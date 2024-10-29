import { RouteObject } from "react-router-dom";
import { SampleA } from "@/views/sample/sampleA";
import { SampleB } from "@/views/sample/sampleB";

export const routes: RouteObject = {
    path: 'sample',
    children: [
        {
            path: 'a',
            element: <SampleA />
        },
        {
            path: 'b',
            element: <SampleB />
        },
    ]
}