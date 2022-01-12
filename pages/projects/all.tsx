

import { Navbar } from '../../components/Navbar'
import { Iprojects } from '../../utils/interfaces'

import { Project } from '../../components/Project'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../utils/useAuth'

interface IProjectsArr {
    projects: Iprojects[]
}
const Projects = (props: IProjectsArr) => {
    const { projects } = props
    const isLoggedIn = useAuth()
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
    const res = await fetch("http://localhost:3000/api/content/projects")
    const projects: Iprojects = await res.json()

    // return props
    return {
        props: { projects },
   
        
    }
    
  }


/* export async function getServerSideProps() {
    // get todo data from API
  
    const res = await fetch("http://localhost:3000/api/main")
    const projects: Iprojects = await res.json()

    // return props
    return {
        props: { projects },
    }
} */
export default Projects