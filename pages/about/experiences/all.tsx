


import { IFormExp, Iprojects } from '../../../utils/interfaces'

import { Project } from '../../../components/Project'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../../utils/useAuth'
import { useInView } from 'react-intersection-observer'
import { Experience } from '../../../components/Experience'

interface Iprops {
    experiences: IFormExp[]
}

const allExp = (props: Iprops) => {


    const { experiences } = props
    const isLoggedIn = useAuth()




    let displayExperiences = experiences.map((experience, i) => {



        return (

            <Experience experience={experience} />


        )
    })


    return (


        <div className="flex justify-center " >
            <div className='w-4/5 flex  flex-col align-center justify-center'>
            {displayExperiences}
            </div>
   
    
        </div>

    )



}
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/content/experiences")
    const experiences: IFormExp = await res.json()

    // return props
    return {
        props: { experiences },


    }

}

export default allExp