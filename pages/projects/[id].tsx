import type { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

import { Iprojects } from '../../utils/interfaces'
import { ImageViewer } from '../../components/ImageViewer'
import { Project } from '../../components/Project'
import { useRouter } from 'next/router'
import axios from 'axios'
import { connect } from '../../utils/dbConnect'


const FocusView = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const project: Iprojects = JSON.parse(projects)

    return (
        <>
          
           
            <Project project={project} focus={true}></Project> 
      



          
        </>
    )



}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context

    if (params) {

        try {
            const { Project } = await connect();

            let temp = await Project.find({ _id: params.id });
            let projects = JSON.stringify(temp)
        
            return {
                props: {
                    projects
                }
            }
           
        }
        catch (err) {
            console.log(err)
            return {
                props: {}
            }
        }

    }
    else {
        return {
            props: {}
        }
    }


}

export const getStaticPaths = async () => {
    const { Project } = await connect();
    let res:Iprojects[] = await Project.find({});

    const projects: Iprojects[] = res
    const paths = projects.map((project: Iprojects) => ({
        params: { id: `${project._id}` },
    }))
    return {
        paths,
        fallback: false
    }
}


export default FocusView



/* 
export const getStaticPaths = async () => {
    const { Project } = await connect();
    let x = await Project.find({});
    const res = await fetch("http://localhost:3000/api/content/projects")
    const projects: Iprojects[] = await res.json()
    const paths = projects.map((project: Iprojects) => ({
        params: { id: `${project._id}` },
    }))
    return {
        paths,
        fallback: false
    }
}
 */