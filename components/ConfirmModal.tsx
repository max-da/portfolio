import { Overlay } from "./Overlay"
import { AlertTriangle } from "react-feather"

interface Iprops {
    cancel: () => void;
    confirm: () => void;
    message: string;
}
export const ConfirmModal = (props: Iprops) => {
    return (
        <>
            <Overlay onClick={props.cancel}>

            </Overlay>
            <div className="w-2/3 bg-white z-20 absolute top-1/4 flex flex-col items-center">
                <h1 >
                    <AlertTriangle className="" />
                </h1>

                <h1>{props.message}</h1>
                <div className="flex w-full justify-around">
                    <button className="bg-emerald-300 w-1/5 flex justify-center items-center" onClick={props.confirm}>
                        Ok
                    </button>
                    <button className="bg-rose-300 w-1/5 flex justify-center items-center" onClick={props.cancel}>
                        Avbryt
                    </button>
                </div>
            </div>
        </>

    )
}