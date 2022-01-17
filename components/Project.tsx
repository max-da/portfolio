import { IFormProject, Iprojects } from "../utils/interfaces";
import { ImageViewer } from "./ImageViewer";
import { ArrowDownCircle, GitHub, Link as LinkIcon, ArrowUpCircle, Edit, X } from "react-feather"
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { EditField } from "./EditField";
import axios from "axios";
import { ConfirmModal } from "./modals/ConfirmModal";

import { useRouter } from "next/router";
import useAuth from "../utils/useAuth";
import Image from "next/image";

interface Iprops {
    project: Iprojects
    focus: boolean;
}


export const Project = (props: Iprops) => {
    const initialValue: IFormProject = {

        name: props.project.name,
        techStack: props.project.techStack,
        description: props.project.description,
        createDate: props.project.createdDate,
        gitLink: props.project.gitLink,
        liveLink: props.project.liveLink
    }
    const { isLoggedIn } = useAuth()
    const [form, setForm] = useState<IFormProject>(initialValue)
    const [editMode, setEditMode] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)
    const [inFocus, setInFocus] = useState(false)
    const router = useRouter()
    let date = new Date(props.project.createdDate)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()


    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.target.value });

    }


    const abortChanges = () => {
        setEditMode(false)
        setForm(initialValue)
    }

    const saveChanges = async () => {
        if (form != initialValue) {
            axios.put("/api/" + props.project._id, form)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        setEditMode(false)
                    }
                })

        }
        else {
            setEditMode(false)
        }

    }
    const deletePost = async () => {
        console.log("HEJ")
        axios.delete("/api/" + props.project._id)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    router.push("/projects/all")
                }
            })
    }

    return (

        <>
            {confirmModal ? (
                <ConfirmModal confirm={deletePost} cancel={() => setConfirmModal(false)} message="Är du säker på att du vill ta bort detta projekt?" />

            ) : null}
            {props.focus ? (
                <div className="w-full flex justify-center">
                    <div className={` max-w-screen-sm flex-col  rounded  flex justify-between items-center   w-full  m-5 drop-shadow-xl  `}>
                  

                        <div className="block w-full">
                            <ImageViewer focus={props.focus} images={props.project.images} />
                        </div>

                        <div className="flex justify-center bg-purple w-full drop-shadow-xl rounded">
                            <h2 className="text-2xl">
                                <EditField name="techStack" content={form.techStack} editMode={editMode} onChange={onChange} />

                            </h2>
                        </div>

                        <div className="flex justify-between  w-full">
                            {props.focus && isLoggedIn ? (
                                <>
                                    {/* is login? */}
                                    {editMode}
                                    {editMode ? (
                                        <>
                                            <button onClick={saveChanges}>Spara</button>
                                            <button onClick={abortChanges}>Avbryt</button>

                                        </>
                                    ) : (
                                        <div>
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
                            {props.project.createdDate ? (
                                <EditField name="createdDate" content={year + "/" + month + "/" + day} editMode={editMode} date={true} onChange={onChange} />

                            ) : null}
                        </div>
                        <span >
                            <EditField name="description" content={form.description} editMode={editMode} description={true} onChange={onChange} />

                        </span>
                        <div className="flex justify-start">


                            {editMode ? (
                                <>
                                    <EditField name="gitLink" content={form.gitLink} editMode={editMode} onChange={onChange} />
                                    {props.project.liveLink ? (
                                        <EditField name="liveLink" content={form.liveLink} editMode={editMode} onChange={onChange} />
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <Link href={form.gitLink}>
                                        <GitHub />
                                    </Link>
                                    {props.project.liveLink ? (
                                        <Link href={form.liveLink}>
                                            <LinkIcon />
                                        </Link>
                                    ) : null}
                                </>
                            )}

                        </div>




                    </div>

                </div>
            ) : (
                <>
                    <div key={props.project._id} onClick={() => {
                        router.push(`/projects/${encodeURIComponent(props.project._id)}`)
                    }} className="
                    h-36
                    overflow-hidden
                    rounded
                    flex
                    justify-center
                    items-center
                    w-4/5
                    m-5
                    drop-shadow-2xl
                    relative
                    ">
                        <div className="h-screen w-screen bg-black opacity-50 absolute">

                        </div>

                        <img className="w-full" src={"/uploads/" + props.project.images[0].image.path} />
                        <h1 className="text-4xl roboto absolute text-bgWhite">
                            {props.project.name}
                        </h1>
                        {/*         <img src={"/uploads/" + props.project.images[0].image.path}/> */}


                    </div>
                </>
            )}
        </>
    )
}