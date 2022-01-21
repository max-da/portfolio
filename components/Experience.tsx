import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Edit, X } from "react-feather";
import { IExperience, IFormExp } from "../utils/interfaces";
import useAuth from "../utils/useAuth";
import { EditField } from "./EditField";
import { BaseModal } from "./modals/BaseModal";
import { ConfirmModal } from "./modals/ConfirmModal";

interface Iprops {
    experience: IExperience
}

/* Objektet för varje experience. Härifrån sköts också editing/borttagning tillsammans med editfield. */
/* Experiences va något av en eftertanke, därav är denna och projects komponenterna ganska lika varandra */
/* Med mer tid hade jag slagit ihop dem */
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
    const [err, setErr] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(form)
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

                    setEditMode(false)

                })
                .catch((x: AxiosError) => {

                    setErr(true)
                    console.log(err)
                })

        }
        else {
            setEditMode(false)
        }

    }
    const deletePost = async () => {
 
        axios.delete("/api/upload/experiences/" + props.experience._id)
            .then((res) => {
                console.log(res)

                router.push("/about/experiences/all")

            })
    }
    return (

        <div className="border rounded mt-5 flex flex-col items-center justify-center border-purple">
            {confirmModal ? (
                <ConfirmModal confirm={deletePost} cancel={() => setConfirmModal(false)} message="Är du säker på att du vill ta bort detta projekt?" />

            ) : null}

            {err ? (
                <BaseModal cancel={() => setErr(false)} title="Hoppsan!" message="Ett obligatoriskt fält har lämnats tomt." />
            ) : null}
            <div className="w-full flex justify-between bg-purple">

                <h1 className="text-bgWhite">
                    <em>
                        <strong>


                            <EditField name="name" content={form.name} editMode={editMode} onChange={onChange} />

                        </strong>
                    </em>
                </h1>
                <div>
                  {form.startDate? (
                        <span className="text-bgWhite">
                        <EditField name="startDate" content={new Date(form.startDate).toLocaleDateString()} editMode={editMode} date={true} onChange={onChange} />
                    </span>
                  ):null}
                    <span className="text-bgWhite"> - </span>
           
                    {props.experience.endDate ? (
                        <span className="text-bgWhite">
                            <EditField name="endDate" content={new Date(props.experience.endDate).toLocaleDateString()} editMode={editMode} date={true} onChange={onChange} />


                        </span>
                    ) : (
                        <span className="text-bgWhite">
                        <EditField name="endDate" content={new Date().toLocaleDateString()} editMode={editMode} date={true} onChange={onChange} />


                    </span>
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
                                    <button onClick={() => { setConfirmModal(true) }}>
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