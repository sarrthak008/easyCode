import { createContext, useContext } from "react";

const store = createContext()

const Storeprovider = ({ children }) => {
    return (
        <store.Provider>
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store)
}

export { useStore, Storeprovider }