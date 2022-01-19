


import { Iprojects } from '../../utils/interfaces'

import { Project } from '../../components/Project'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../utils/useAuth'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { connect } from '../../utils/dbConnect'
import { InferGetStaticPropsType } from 'next'
import { json } from 'node:stream/consumers'
import { InferGetServerSidePropsType,GetStaticProps} from 'next'

interface IProjectsArr {
    projects: Iprojects[]
}

const Projects = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {

    console.log(projects)
    const isLoggedIn = useAuth()
    const parsed:Iprojects[] = JSON.parse(projects)

    let displayProjects = parsed.map((project) => {

        console.log("HÄR")
        console.log(Array.isArray(project))
        console.log(project)
        return (
            <Project key={project._id} focus={false} project={project} />


        )
    })

    return (


        <div className=" flex  flex-col justify-center items-center w-full  " >



            {isLoggedIn.isLoggedIn ? (
                <Link href="/admin/upload/project">
                    <button className="text-2xl hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                        Ladda upp nytt projekt
                    </button>
                </Link>
            ) : (null)}
            {displayProjects}


        </div>

    )



}
export async function getStaticProps() {


    const { Project } = await connect();

    let temp: Iprojects[] = await Project.find({});
    let projects = JSON.stringify(temp)

    return {
        props: {
            projects
        }
    }

}

export default Projects

