import React, { ReactChild, ReactNode } from "react"
import useOverlay from "../utils/overlayContext"


export const Overlay = () => {
    const {setToggle} = useOverlay()
    return (
        <div className="w-screen h-screen bg-black  absolute opacity-25" onClick={()=>setToggle()}>
          
        </div>

    )
}