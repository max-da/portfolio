import type { NextPage } from 'next'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import axios, { AxiosError } from "axios";
import { Navbar } from '../../components/Navbar';
import { Iform } from '../../utils/interfaces';

interface IDisplayObject {
    [key: string]: {
        name:string;
        displayName:string;
        required:boolean;
        date?:boolean;
        
    }
}

let projectInfo: IDisplayObject = {
    name:{
        name:"name",
        displayName:"Projekt namn",
        required:true
    },
    techStack:{
        name:"techStack",
        displayName:"Tech stack",
        required:true
    },
    description:{
        name:"description",
        displayName:"Beskrivning",
        required:true
    },
    createdDate:{
        name:"createdDate",
        displayName:"Datum",
        required:false,
        date:true,
    },
    gitLink:{
        name:"description",
        displayName:"Länk till git",
        required:false
    },
    liveLink:{
        name:"liveLink",
        displayName:"Länk",
        required:false
    }
}
const options = {
    headers: {
        "Content-type": "multipart/form-data"
    }

}
const upload: NextPage = () => {
    const { API_URL } = process.env
    const [files, setFiles] = useState<FileList | null>()
    const [error,setError] = useState("")

    const [form, setForm] = useState<Iform>({
        name: "",
        techStack: "",
        description: "",
        createDate: new Date,
        gitLink: "",
        liveLink: ""
    })

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
        let formData = new FormData()
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const element = files[i];
                formData.append("image", element)

            }
        }
        for (const [key, value] of Object.entries(form)) {
            formData.append(key, value)
            console.log(value)
        }


        console.log(formData.getAll("image"))

        await axios.post("/api/main", formData, options
        )
            .then((res) => {
                console.log(res)
                if (res.status === 500) {
                    console.log("ERR")

                }
                console.log("RES^^")
            })
            .catch((err:AxiosError) => {
              
                setError(err.message)
            })

    }
    return (
        <>
        <Navbar/>
        <div className="bg-blue-300 flex flex-col justify-center items-center h-screen" >
            {error? (
                error
            ):null}
            <div className='flex-col flex justify-center items-center h-96 '>
                <form className='flex-col flex' encType='multipart/form-data' >
                {Object.entries(projectInfo).map(([key, value]) => {
                    return(
                        <input key={key} type={value.date ? "Date": "text"} onChange={(e) => onChange(e)} className='m-1' placeholder={value.displayName} name={key} />
                    )
                })}

                    <input multiple className='text-3xl' name="image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(e) }} />
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

export default upload
