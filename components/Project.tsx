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
import { animated, useTransition, config } from "react-spring";

interface Iprops {
    project: Iprojects;
    focus: boolean;
}


export const Project = (props: Iprops) => {
    const { project, focus } = props

    const chosenProject: Iprojects = { ...project[0] }
    console.log(chosenProject)
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
    const [goToSpecific, setGoToSpecific] = useState(false)
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


    const abortChanges = () => {
        setEditMode(false)
        setForm(initialValue)
    }

    const saveChanges = async () => {
        if (form != initialValue) {
            await axios.put("/api/upload/projects/" + chosenProject._id, form)
                .then((res) => {
                    console.log(res)
                    setEditMode(false)
                })
                .catch((err: AxiosError) => {
                    console.log(err)
                    setErr(true)
                })

        }
        else {
            setEditMode(false)
        }

    }
    const deletePost = async () => {
        console.log("HEJ")
        axios.delete("/api/upload/projects/" + project[0]._id)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    router.push("/projects/all")
                }
            })
    }

    const transition = useTransition(!goToSpecific, {
        from: { opacity: 1 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 100, height: 1000 },
        config: { duration: 1500 }
    })





    return (

        <>

            {props.focus ? (
                <>
                    <div className=" w-full max-w-3xl flex-col items-center flex justify-center">
                        {confirmModal ? (
                            <ConfirmModal confirm={deletePost} cancel={() => setConfirmModal(false)} message="Är du säker på att du vill ta bort detta projekt?" />

                        ) : null}

                        {err ? (
                            <BaseModal cancel={() => setErr(false)} title="Hoppsan!" message="Ett obligatoriskt fält har lämnats tomt." />
                        ) : null}
                        <ImageViewer project={chosenProject.images} focus={props.focus} />

                        <div className="border border-purple w-full drop-shadow-2xl rounded ">
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



                </>
            ) : (
                <>


                    <div key={project._id} onClick={() => { setGoToSpecific(true), router.push(`/projects/${encodeURIComponent(project._id)}`) }} className="
                    h-36
                    overflow-clip
                    hover:cursor-pointer
                    flex
                    justify-center
                    items-center
                    w-full
                   
                    self
                    drop-shadow-2xl
                    relative
                    ">



                        <img className="w-screen object-cover object-center h-full" src={"/uploads/" + project.images[0]?.image.path} />


                        <div className="h-screen w-screen bg-black opacity-50 absolute">

                        </div>

                        <h1 className="text-4xl roboto absolute text-bgWhite">
                            {project.name}
                        </h1>



                    </div>



                </>
            )}
        </>
    )
}