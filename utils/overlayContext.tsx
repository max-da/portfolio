import { createContext, useContext, useState } from "react";

export const ToggleContext = createContext({
    toggle: false,
    setToggle: () => { },
});


export const ToggleContextProvider: React.FC = ({ children }) => {
    const [internal, setInternal] = useState(false)
    const setToggle = () => {
        setInternal(internal => !internal)
     
    };

    const initalValue = {
        toggle: internal,
        setToggle: setToggle,
    };
    const [state, setState] = useState(initalValue);

    return (
        <ToggleContext.Provider value={initalValue}>
            {children}
        </ToggleContext.Provider>
    );
};

const useOverlay = () => useContext(ToggleContext)
export default useOverlay

