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
    const [postPath, setPostPath] = useState("")
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

        await axios.post(postPath, postForm,options
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

    useEffect(() => {

        const path = router.pathname.replace("admin", "api")
        console.log(path)
        setPostPath(path)
    }, [])
    return (
        <>

            <div className="bg-blue-300 flex flex-col justify-center items-center h-screen" >
                {error ? (
                    error
                ) : null}
                <div className='flex-col flex justify-center items-center h-96 '>
                    <form className='flex-col flex' encType='multipart/form-data' >
                        {Object.entries(projectInfo).map(([key, value]) => {
                            return (
                                <input key={key} type={value.date ? "Date" : "text"} onChange={(e) => onChange(e)} className='m-1' placeholder={value.displayName} name={key} />
                            )
                        })}
                        {props.files ? (
                            <input multiple className='text-3xl' name="image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(e) }} />
                        ) : null}


                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => { handleSubmit() }}>
                            Submit
                        </button>
                    </form>

                </div>




            </div>
        </>
    )
}

