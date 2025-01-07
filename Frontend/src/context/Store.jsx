import { createContext, useContext, useState } from "react";

const store = createContext()

const Storeprovider = ({ children }) => {

    const [settingCourse ,setsettingCourse] = useState("1")

    return (
        <store.Provider value={{setsettingCourse,settingCourse}}>
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store)
}

export { useStore, Storeprovider }