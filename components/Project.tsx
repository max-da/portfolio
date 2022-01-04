import { Iprojects } from "../utils/interfaces";
import { ImageViewer } from "./ImageViewer";
import { ArrowDownCircle, GitHub, Link as LinkIcon, ArrowUpCircle,Edit } from "react-feather"
import Link from "next/link";

interface Iprops {
    project: Iprojects
    focus: boolean;
}
export const Project = (props: Iprops) => {
    console.log(props)
    let date = new Date(props.project.createdDate)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    console.log(props.project.createdDate)
    return (
        <div key={props.project._id} className={` ${props.focus ? "w-5/5" : "w-4/5"}`}>

            <div className={`bg-red-800 w-5/5 h-5/5 rounded m-1 `} >
                <div className="flex justify-between items-center">
                    <h3 className='m-1'>
                        {props.project.name}

                    </h3>
                    <Edit/>
                    {props.project.createdDate ? (
                        <span className="m-1">{year + "/" + month + "/" + day}</span>
                    ) : null}
                </div>

                <ImageViewer focus={props.focus} images={props.project.images} />
                {props.focus ? (
                    <>
                        <div className="flex justify-center">
                            <h2>{props.project.techStack}</h2>
                        </div>
                        <div>
                            <span>{props.project.description}</span>

                        </div>
                        <div className="flex justify-start">
                            <Link href={props.project.gitLink}>
                                <GitHub />
                            </Link>
                            {props.project.liveLink ? (
                                <Link href={props.project.liveLink}>
                                    <LinkIcon />
                                </Link>
                            ) : null}

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
    )
}