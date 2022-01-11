import { Imodal } from "../../utils/interfaces"
import { Overlay } from "../Overlay"


export const BaseModal = (props: Imodal) => {
    return (
        <>
            <Overlay onClick={props.cancel}>

            </Overlay>
            <div className="w-2/3 bg-white z-20 absolute top-1/4 flex flex-col items-center">
                <h1 >
                    {props.title}
                </h1>

                <h1>{props.message}</h1>
                <div className="flex w-full justify-around">
             
                    <button className="bg-rose-300 w-1/5 flex justify-center items-center" onClick={props.cancel}>
                        Stäng
                    </button>
                </div>
            </div>
        </>

    )
}