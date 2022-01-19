import { Overlay } from "../Overlay"
import { AlertTriangle } from "react-feather"

interface Iprops {
    cancel: () => void;
    confirm: () => void;
    message: string;
}
export const ConfirmModal = (props: Iprops) => {
    return (
        <>

            <div className="w-4/5 bg-bgWhite absolute rounded border border-purple z-50  flex flex-col items-center">
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