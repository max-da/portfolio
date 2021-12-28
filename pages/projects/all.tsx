import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import { Iprojects } from '../../utils/interfaces'
import { ImageViewer } from '../../components/ImageViewer'
import { Project } from '../../components/Project'
interface IProjectsArr {
    projects: Iprojects[]
}
const Projects = (props: IProjectsArr) => {
    const { projects } = props
    console.log(projects)
    let displayProjects = projects.map((project) => {
     
       

        return (
            <Project focus={false} project={project}/>


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