import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Iprojects } from '../utils/interfaces'
import { GitHub } from "react-feather"
interface IProjectsArr {
    projects: Iprojects[]
}
const Projects = (props: IProjectsArr) => {
    const { projects } = props
    console.log(projects)
    let displayProjects = projects.map((project) => {
        let src = ""
        if (project.images[0]) {
            src = "/uploads/" + project.images[0].image.path
        }
        let date = new Date(project.createdDate)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()

        return (
            <div key={project.id} className="w-4/5 ">

                <div className=' bg-red-800 w-5/5 h-5/5 rounded m-1' >
                    <h3 className='m-1'>
                        {project.name}
                    </h3>
                    <Image height={400} width={500} layout='responsive'
                        objectFit="contain" className='bg-red-200' src={src} />
                    <div className='bg-red-800 flex-start'>
                        <div className='flex justify-between'>
                            {project.createdDate ? (
                                <span>{year + "/" + month + "/" + day}</span>
                            ) : null}
                        </div>
                        <div className='m-1'>
                            {project.description}

                        </div>
                    </div>
                </div>
            </div>


        )
    })

    return (
        <>
            <Navbar />
            <div className="bg-blue-300 flex flex-col justify-center items-center" >

                {displayProjects}



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