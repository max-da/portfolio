import { Iform, Iprojects } from "../utils/interfaces";
import { ImageViewer } from "./ImageViewer";
import { ArrowDownCircle, GitHub, Link as LinkIcon, ArrowUpCircle, Edit, X } from "react-feather"
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { EditField } from "./EditField";
import axios from "axios";
import { ConfirmModal } from "./modals/ConfirmModal";

import { useRouter } from "next/router";
import useAuth from "../utils/useAuth";

interface Iprops {
    project: Iprojects
    focus: boolean;
}


export const Project = (props: Iprops) => {
    const initialValue: Iform = {

        name: props.project.name,
        techStack: props.project.techStack,
        description: props.project.description,
        createDate: props.project.createdDate,
        gitLink: props.project.gitLink,
        liveLink: props.project.liveLink
    }
    const {isLoggedIn} = useAuth()
    const [form, setForm] = useState<Iform>(initialValue)
    const [editMode, setEditMode] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)
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


            <div key={props.project._id} className={`w-screen`}>
                <button onClick={() => console.log(form)}>maxtest</button>

                <div className={`bg-red-800  rounded m-1 `} >

                    <div className="flex justify-between items-center">
                        <h3 className='m-1'>

                            <EditField name={"name"} content={form.name} editMode={editMode} onChange={onChange} />
                        </h3>
                        {/* FOCUS AND LOG IN */}
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
                                    <>
                                        <button onClick={() => { setEditMode(editMode => !editMode) }}>
                                            <Edit />
                                        </button>
                                        <button onClick={() => { setConfirmModal(true) }}>
                                            <X />
                                        </button>

                                    </>
                                )}


                            </>
                        ) : null}
                        {props.project.createdDate ? (
                            <EditField name="createdDate" content={year + "/" + month + "/" + day} editMode={editMode} date={true} onChange={onChange} />

                        ) : null}
                    </div>

                    <ImageViewer focus={props.focus} images={props.project.images} />
                    {props.focus ? (
                        <>


                            <div className="flex justify-center">
                                <h2>
                                    <EditField name="techStack" content={form.techStack} editMode={editMode} onChange={onChange} />

                                </h2>
                            </div>
                            <div>
                                <span>
                                    <EditField name="description" content={form.description} editMode={editMode} description={true} onChange={onChange} />
                                </span>

                            </div>
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
                            <div className='flex justify-end'>
                                <Link scroll={false} href={`/projects/all`}>
                                    <ArrowUpCircle className="m-1" />
                                </Link>

                            </div>
                        </>


                    ) : (
                        <div className='flex justify-end'>
                            <Link scroll={false} href={`/projects/${encodeURIComponent(props.project._id)}`}>
                                <ArrowDownCircle className="m-1" />
                            </Link>

                        </div>
                    )}

                </div>
            </div>
        </>
    )
}