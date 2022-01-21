import React, { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosError } from "axios";
import { IDisplayObject, IFormProject, IFormExp, Imodal } from '../utils/interfaces';
import { useRouter } from 'next/router';
import { BaseModal } from ".././components/modals/BaseModal";



let options = {
    headers: {
        "Content-type": "multipart/form-data"
    }

}

interface Iprops {
    files: boolean;
    items: IDisplayObject;


}
let initial: IFormExp | IFormProject = {
    name: "",
    techStack: "",
    description: "",
    createDate: new Date,
    gitLink: "",
    liveLink: ""
}

/* Hanterar uppladdning för både exp & projekt. Detta görs genom att loopa ut objektattributen som den tar emot genom props */
/* Beroende av url väljs vart post req ska skickas, form utformas beroende om det finns filer eller inte */
export const Upload = (props: Iprops) => {
    const projectInfo = props.items;
    const router = useRouter()
    const [files, setFiles] = useState<FileList | null>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modal, setModal] = useState<Imodal>({ cancel: () => { setShowModal(false) }, message: "", title: "" })
    const [postPath, setPostPath] = useState("")
    const [form, setForm] = useState<IFormExp | IFormProject>(initial)

    if (!props.files) {
        options = {
            headers: {
                "Content-type": "application/json"
            }

        }
        initial = {
            name: "",
            description: "",
            startDate: null,
            endDate: null,

        }
    }


   
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setFiles(e.currentTarget.files)
        }

        if (e.target.name != "image") {

            let name = e.target.name
            setForm({ ...form, [name]: e.target.value });


        }


    }


    useEffect(() => {
        if (router.pathname.includes("project")) {
            setPostPath("/api/upload/projects/post")
        } else {
            setPostPath("/api/upload/experiences/post")
        }
    }, [])

    const handleSubmit = async () => {
        let postForm: IFormExp | IFormProject | FormData = form
        let formData = new FormData()

        for (const [key, value] of Object.entries(form)) {
            formData.append(key, value)

        }
        if (files) {
         
            for (let i = 0; i < files.length; i++) {
                const element = files[i];
                formData.append("image", element)

            }

            if (FileList.length < 1) {

                setModal(modal => ({ ...modal, title: "Error", message: "Du måste lägga till minst en bild" }))
                setShowModal(true)


            }
            postForm = formData
        }

        await axios.post(postPath, postForm, options, 
        )

            .then((res) => {
                return setModal(modal => ({ ...modal, title: "Succé!", message: "Uppladdning lyckades." }))

            })
            .catch((err: AxiosError) => {

                return setModal(modal => ({ ...modal, title: "Någonting gick fel", message: "Vänligen fyll i rödmarkerade fält" }))
            })


    }

    useEffect(()=>{
        if(modal.title){
            setShowModal(true)
        }
    },[modal])

    return (
        <>
       

                <div className="flex flex-col  items-center justify-start  w-full max-h-screen " >
                    {showModal ? (
                        <BaseModal title={modal.title} message={modal.message} cancel={modal.cancel} />
                    ) : null}
               
                    <div className='flex-col max-w-md flex justify-center items-center w-4/5 mt-24 border border-red-500 drop-shadow-2xl rounded '>
                        <form className='flex-col flex justify-center  w-full' encType='multipart/form-data' >
                            {Object.entries(projectInfo).map(([key, value]) => {
                                return (

                                    <div key={key} className='bg-white border flex flex-col'>
                                        <label className='border-b w-2/5' htmlFor={key} >
                                            <span>
                                                {value.displayName}
                                            </span>
                                            {value.required ? (
                                                <span className='ml-1 text-red-500'>
                                                    *
                                                </span>
                                            ) : null}
                                        </label>
                                        <input key={key} type={value.date ? "Date" : "text"}
                                            onChange={(e) => onChange(e)}
                                            className=' text-2xl'
                                            placeholder={"..."}
                                            name={key} />
                                    </div>
                                )
                            })}
                            {props.files ? (
                                <>
                                    <span>Bilder</span>
                                    <div className='w-full flex'>

                                        <input multiple className='text-2xl bg-red-500' name="image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(e) }} />

                                    </div>
                                </>
                            ) : null}


                            <button type='button' className="text-2xl hover:bg-red-500 rounded-lg border p-3 bg-purple text-bgWhite drop-shadow-xl"
                                onClick={handleSubmit}>
                                Spara
                            </button>
                        </form>

                    </div>




                </div>
      
        </>
    )
}

