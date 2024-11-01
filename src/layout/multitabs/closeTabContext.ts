import { createContext } from "react";

export const CloseTabContext = createContext<{ closeCurrentTab?: () => void }>({});
