import { IFormProject, Imodal, Iprojects } from "../utils/interfaces";
import { ImageViewer } from "./ImageViewer";
import { ArrowDownCircle, GitHub, Link as LinkIcon, ArrowUpCircle, Edit, X } from "react-feather"
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { EditField } from "./EditField";
import axios, { AxiosError } from "axios";
import { ConfirmModal } from "./modals/ConfirmModal";

import { useRouter } from "next/router";
import useAuth from "../utils/useAuth";
import Image from "next/image";
import { BaseModal } from "./modals/BaseModal";

interface Iprops {
    project: Iprojects;
    focus: boolean;
}


export const Project = (props: Iprops) => {
    const { project, focus } = props
    const chosenProject = { ...project[0] }

    const initialValue: IFormProject = {
        name: chosenProject.name,
        techStack: chosenProject.techStack,
        description: chosenProject.description,
        createDate: chosenProject.createdDate,
        gitLink: chosenProject.gitLink,
        liveLink: chosenProject.liveLink
    }
    const { isLoggedIn } = useAuth()
    const [form, setForm] = useState<IFormProject>(initialValue)
    const [editMode, setEditMode] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)

    const [err, setErr] = useState(false)

    const router = useRouter()
    let date = new Date(project.createdDate)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    console.log(project.images)

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.target.value });
        console.log(form)

    }
    useEffect(() => {

    }, [])

    const abortChanges = () => {
        setEditMode(false)
        setForm(initialValue)
    }

    const saveChanges = async () => {
        if (form != initialValue) {
            axios.put("/api/upload/projects/" + project._id, form)
                .then((res) => {
                    console.log(res)
                    setEditMode(false)
                })
                .catch((err: AxiosError) => {

                    setErr(true)
                })

        }
        else {
            setEditMode(false)
        }

    }
    const deletePost = async () => {
        console.log("HEJ")
        axios.delete("/api/" + project._id)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    router.push("/project[0]s/all")
                }
            })
    }

    return (

        <>

            {props.focus ? (
                <div className="w-full flex relative justify-center">
                    {confirmModal ? (
                        <ConfirmModal confirm={deletePost} cancel={() => setConfirmModal(false)} message="Är du säker på att du vill ta bort detta projekt?" />

                    ) : null}

                    {err ? (
                        <BaseModal cancel={() => setErr(false)} title="Hoppsan!" message="Detta attribut kan inte lämnas tomt." />
                    ) : null}
                    <div className={` max-w-screen-sm flex-col  rounded  flex justify-between items-center   w-full  m-5 drop-shadow-xl  `}>


                        <div className="block w-full">
                            <ImageViewer project={chosenProject.images} focus={props.focus} />
                        </div>
                        <div className="border border-purple w-full drop-shadow-2xl rounded">
                            <div className="flex justify-center text-2xl text-bgWhite bg-purple w-full    ">
                                <h2 className="text-2xl break-all">
                                    <EditField name="name" content={form.name} editMode={editMode} onChange={onChange} />

                                </h2>
                            </div>

                            <div className="flex flex-col  items-center ">

                                <h2 className="text-xl italic relative break-all">
                                    <EditField name="techStack" content={form.techStack} editMode={editMode} onChange={onChange} />

                                </h2>
                                <div className=" absolute right-0 ">
                                    {props.focus && isLoggedIn ? (
                                        <>
                                            {/* is login? */}
                                            {editMode}
                                            {editMode ? (
                                                <>
                                                    <button className="m-1" onClick={saveChanges}>Spara</button>
                                                    <button className="m-1" onClick={abortChanges}>Avbryt</button>

                                                </>
                                            ) : (
                                                <div className="justify-self-end">
                                                    <button onClick={() => { setEditMode(editMode => !editMode) }}>
                                                        <Edit />
                                                    </button>
                                                    <button onClick={() => { setConfirmModal(true) }}>
                                                        <X />
                                                    </button>

                                                </div>
                                            )}


                                        </>
                                    ) : null}
                                    {project.createdDate ? (
                                        <EditField name="createdDate" content={year + "/" + month + "/" + day} editMode={editMode} date={true} onChange={onChange} />

                                    ) : null}
                                </div>
                            </div>

                            <div className="w-5/5 m-1 flex justify-center text-center">
                                <span className="break-all" >
                                    <EditField name="description" content={form.description} editMode={editMode} description={true} onChange={onChange} />

                                </span>
                            </div>
                            <div className="flex">
                                {editMode ? (
                                    <>
                                        <EditField name="gitLink" content={form.gitLink} editMode={editMode} onChange={onChange} />

                                        <EditField name="liveLink" content={form.liveLink} editMode={editMode} onChange={onChange} />

                                    </>
                                ) : (
                                    <>
                                        <a href={form.gitLink} rel="noreferrer" target="_blank">
                                            <GitHub />
                                        </a>
                                        {chosenProject.liveLink ? (
                                            <a href={form.liveLink} rel="noreferrer" target="_blank">
                                                <LinkIcon />
                                            </a>
                                        ) : null}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>





            ) : (

                <div key={project._id} onClick={() => {
                    router.push(`/projects/${encodeURIComponent(project._id)}`)
                }} className="
                    h-36
                    overflow-clip
                 
                    flex
                    justify-center
                    items-center
                    w-full
                   
                    self
                    drop-shadow-2xl
                    relative
                    ">


                    <img className="w-full" src={"/uploads/" + project.images[0].image.path} />

                    <div className="h-screen w-screen bg-black opacity-50 absolute">

                    </div>

                    <h1 className="text-4xl roboto absolute text-bgWhite">
                        {project.name}
                    </h1>



                </div>

            )}
        </>
    )
}