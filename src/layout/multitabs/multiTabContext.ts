import { createContext } from "react";

interface MultiTabContextType {
    closeCurrentTab?: () => void,
    setTabTitle?: (title: string) => void,
}

const MultiTabContext = createContext<MultiTabContextType>({});


export {
    MultiTabContext
}