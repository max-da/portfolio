import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

import { Iprojects } from '../../utils/interfaces'
import { ImageViewer } from '../../components/ImageViewer'
import { Project } from '../../components/Project'
import { useRouter } from 'next/router'
import axios from 'axios'

interface IProjectsArr {
    projects: Iprojects
}
const FocusView = (props: any) => {
    console.log("HEJS")

    console.log(props.project[0]._id)
    return (
        <>
          
           
            <Project project={props.project[0]} focus={true}></Project>
      



          
        </>
    )



}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context

    if (params) {

        try {
            const res = await fetch(`http://localhost:3000/api/${params.id}`)
            console.log(res.status)
            const data = await res.json()

            return {
                props: {
                    project: data
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


export default FocusView