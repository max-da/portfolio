import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Iprojects } from '../utils/interfaces'
interface IProjectsArr {
    projects: Iprojects[]
}
const Projects = (props: IProjectsArr) => {
    const { projects } = props
    console.log(projects)
    let displayProjects = projects.map((project) => {
        let src = ""
        if (project.images[1]) {
            src = "/uploads/" + project.images[1].image.path
        }

        return (
            <div key={project.id}>
                <p >
                    {project.name}
                </p>
                <div style={{ border: "1px solid red" }}>
                    <img style={{ width: "50px" }} src={src} />
                </div>
            </div>


        )
    })

    return (
        <>
            <div className="bg-blue-300 flex justify-center items-center h-screen" >
                {displayProjects}
                <Link href="/admin/upload">
                    <a className='text-8xl'>hej</a>
                </Link>
                <button onClick={() => getServerSideProps()}>sd</button>
            </div>
        </>
    )



}

export async function getServerSideProps() {
    // get todo data from API
    const res = await fetch("http://localhost:3000/api/main")
    const projects: Iprojects = await res.json()

    // return props
    return {
        props: { projects },
    }
}
export default Projects