


import { Iprojects } from '../../utils/interfaces'

import { Project } from '../../components/Project'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../utils/useAuth'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

interface IProjectsArr {
    projects: Iprojects[]
}

const Projects = (props: IProjectsArr) => {
    let root: HTMLElement | null = null
    const { ref, inView, entry } = useInView({
        root: root,
        threshold: 0,
      });
    const { projects } = props
    const isLoggedIn = useAuth()
    const [arrowIndex, setArrowIndex] = useState(0)
    const [indicies, setIndicies] = useState(projects.length)
    console.log(projects)

    useEffect(()=>{
        root=   document.getElementById("viewPortRoot");
    },[])
    let displayProjects = projects.map((project, i) => {
     
       

        return (
            <Project focus={false} project={project}/>


        )
    })

 
    return (
      
      
            <div className=" flex  flex-col justify-center items-center  " >
                
            {displayProjects}

            {isLoggedIn?(
                <Link href="/admin/upload/project">
                    <button>
                        Ladda upp nytt projekt
                    </button>
                </Link>
            ):(null)}
  


            </div>
     
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

export default Projects