import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Edit, X } from "react-feather";
import { IExperience, IFormExp } from "../utils/interfaces";
import useAuth from "../utils/useAuth";
import { EditField } from "./EditField";

interface Iprops {
    experience: IExperience
}
export const Experience = (props: Iprops) => {
    const initialValue: IFormExp = {

        name: props.experience.name,
        description: props.experience.description,
        startDate: props.experience.startDate,
        endDate: props.experience.endDate

    }
    const { isLoggedIn } = useAuth()
    const [form, setForm] = useState<IFormExp>(initialValue)
    const [editMode, setEditMode] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false)
    const router = useRouter()


    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.target.value });

    }


    const abortChanges = () => {
        setEditMode(false)
        setForm(initialValue)
    }

    const saveChanges = async () => {
        if (form != initialValue) {
            axios.put("/api/upload/experiences/" + props.experience._id, form)
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
        console.log(props.experience._id)
        axios.delete("/api/upload/experiences/" + props.experience._id)
            .then((res) => {
                console.log(res)

                router.push("/about/experiences/all")

            })
    }
    return (
        
            <div className="border rounded mt-5 flex flex-col items-center justify-center border-purple">
                <div className="w-full flex justify-between bg-purple">
                    <h1 className="text-bgWhite">
                        <em>
                            <strong>


                                <EditField name="name" content={form.name} editMode={editMode} onChange={onChange} />

                            </strong>
                        </em>
                    </h1>
                    <div>
                        <span className="text-bgWhite">
                            <EditField name="startDate" content={new Date(form.startDate).toLocaleDateString()} editMode={editMode} date={true} onChange={onChange} />
                        </span>
                        <span className="text-bgWhite"> - </span>
                        {props.experience.endDate ? (
                            <span className="text-bgWhite">
                                <EditField name="endDate" content={new Date(props.experience.endDate).toLocaleDateString()} editMode={editMode} date={true} onChange={onChange} />


                            </span>
                        ) : (
                            <span className="text-bgWhite">nuvarande</span>
                        )}

                    </div>
                </div>
                <div className="w-full flex justify-start">
                    <div className="m-1">
                        <span className="m-1 ">
                            <EditField name="description" content={form.description} editMode={editMode} onChange={onChange} />

                        </span>
                        {isLoggedIn ? (
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
                                        <button onClick={() => { deletePost() }}>
                                            <X />
                                        </button>

                                    </div>
                                )}


                            </>
                        ) : null}
                    </div>
                </div>
            </div>
    
    )
}