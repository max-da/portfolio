import { Imodal } from "../../utils/interfaces"


export const BaseModal = (props: Imodal) => {
    return (
        <>

           
                <div className="w-full max-w-sm bg-bgWhite absolute rounded border border-purple z-50  flex flex-col items-center drop-shadow-2xl">
                    <h1 className="text-3xl font-roboto mb-3 ">
                        {props.title}

                    </h1>


                    <div className="flex w-full justify-around flex-col items-center">
                   
        
                            <span>{props.message}</span>
            
                        <button className="rounded text-1xl hover:bg-red-500 bg-purple text-bgWhite w-1/5 flex justify-center items-center" onClick={props.cancel}>
                            Ok
                        </button>
                    </div>
                </div>
         
        </>

    )
}