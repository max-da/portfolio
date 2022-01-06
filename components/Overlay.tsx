import React, { ReactChild, ReactNode } from "react"

interface Iprops {
    children: ReactNode;
    onClick: () => void;
}
export const Overlay = (props: Iprops) => {
    return (
        <div className="w-screen h-screen bg-black z-10 absolute opacity-25" onClick={()=>props.onClick()}>
            {props.children}
        </div>

    )
}