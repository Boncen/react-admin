import { SampleA } from "@/views/sample/sampleA";
import { SampleB } from "@/views/sample/sampleB";

export const routes: MenuItemExt = {
    path: 'sample',
    name:"sample",
    children: [
        {
            path: 'a',
            name: "a",
            fullPath: '/sample/a',
            element: <SampleA />
        },
        {
            path: 'b',
            name: "b",
            fullPath: '/sample/b',
            element: <SampleB />
        },
    ]
}