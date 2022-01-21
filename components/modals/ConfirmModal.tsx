
import { AlertTriangle } from "react-feather"

interface Iprops {
    cancel: () => void;
    confirm: () => void;
    message: string;
}
export const ConfirmModal = (props: Iprops) => {
    return (
        <>

            <div className="w-3/5 max-w-sm bg-bgWhite absolute rounded border border-purple z-50  flex flex-col items-center drop-shadow-2xl">
                <h1 className="text-3xl w-full flex justify-center font-roboto mb-3 ">
                    <AlertTriangle className="" />

                </h1>


                <div className="flex w-full text-center justify-center flex-col items-center">

                    <p>{props.message}</p>

                    <div className="flex justify-around w-full">

                        <button className="rounded text-1xl hover:bg-red-500 bg-purple text-bgWhite w-1/5 flex justify-center items-center" onClick={props.confirm}>
                            Ok
                        </button>
                        <button className="rounded text-1xl hover:bg-red-500 bg-purple text-bgWhite w-1/5 flex justify-center items-center" onClick={props.cancel}>
                            Avbryt
                        </button>

                    </div>
                </div>
            </div>
            
        </>

    )
}