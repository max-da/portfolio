import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import { Iprojects } from '../../utils/interfaces'
import { ImageViewer } from '../../components/ImageViewer'
import { Project } from '../../components/Project'

interface IProjectsArr {
    projects: Iprojects
}
const FocusView = (props: IProjectsArr) => {
    console.log(props.projects)
    console.log("HÄR")
    let projects = props
    

    return (
        <>
            <Navbar />
            <div className="bg-blue-300 flex flex-col justify-start items-center h-screen" >
            <Project project={props.projects} focus={true}/>
                



            </div>
        </>
    )



}

export async function getServerSideProps() {
    // get todo data from API
    const res = await fetch("http://localhost:8000/spec")
    const projects: Iprojects = await res.json()
   
    // return props
    return {
        props: { projects },
    }
}
export default FocusView