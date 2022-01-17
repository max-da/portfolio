import type { NextPage } from 'next'

import React, { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosError } from "axios";
import { IDisplayObject, IFormProject, IFormExp } from '../utils/interfaces';
import { useRouter } from 'next/router';



let options = {
    headers: {
        "Content-type": "multipart/form-data"
    }

}

interface Iprops {
    files: boolean;
    items: IDisplayObject;


}

export const Upload = (props: Iprops) => {
    const projectInfo = props.items;
    const router = useRouter()
    const { API_URL } = process.env
    const [files, setFiles] = useState<FileList | null>()
    const [error, setError] = useState("")
    const [postPath, setPostPath] = useState("/api/content/projects")
    let initial: IFormExp | IFormProject = {
        name: "",
        techStack: "",
        description: "",
        createDate: new Date,
        gitLink: "",
        liveLink: ""
    }

    if (!props.files) {
        options = {
            headers: {
                "Content-type": "application/json"
            }

        }
        initial = {
            name: "",
            description: "",
            startDate: new Date,
            endDate: new Date,
            current: false
        }
    }



    const [form, setForm] = useState<IFormExp | IFormProject>(initial)
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setFiles(e.currentTarget.files)
        } else {
            setPostPath("/api/content/experiences")
        }
        if (e.target.value) {

            let name = e.target.name
            setForm({ ...form, [name]: e.target.value });
            console.log(e.target.value)

        }
        console.log(form)

    }
    const handleSubmit = async () => {
        console.log(files)
        console.log(form)
        let postForm: IFormExp | IFormProject | FormData = form
        let formData = new FormData()
        for (const [key, value] of Object.entries(form)) {
            formData.append(key, value)
            console.log(value)
        }
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const element = files[i];
                formData.append("image", element)

            }
            postForm = formData
        }

        console.log("HÄRÄRÄRÄÄR")
        console.log(formData.entries())

        await axios.post(postPath, postForm, options
        )
            .then((res) => {
                console.log(res)
                if (res.status === 500) {
                    console.log("ERR")

                }
                console.log("RES^^")
            })
            .catch((err: AxiosError) => {

                setError(err.message)
            })

    }

    /*   useEffect(() => {
  
          const path = router.pathname.replace("admin", "api")
          console.log(path)
          setPostPath(path)
      }, []) */
    return (
        <>

            <div className="flex flex-col items-center justify-center w-full  " >
                {error ? (
                    error
                ) : null}
                <div className='flex-col flex justify-center items-center w-4/5 mt-5 border border-red-500 drop-shadow-2xl rounded '>
                    <form className='flex-col flex justify-center  w-full' encType='multipart/form-data' >
                        {Object.entries(projectInfo).map(([key, value]) => {
                            return (
                                
                                <div className='bg-white border flex flex-col'>
                                <label className='border-b w-2/5' htmlFor={key} >
                                    <span>
                                        {value.displayName}
                                    </span>
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


                        <button type="button" className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => { handleSubmit() }}>
                            Submit
                        </button>
                    </form>

                </div>




            </div>
        </>
    )
}

