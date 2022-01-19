


import { IExperience, IFormExp, Iprojects } from '../../../utils/interfaces'

import { Project } from '../../../components/Project'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../../utils/useAuth'
import { useInView } from 'react-intersection-observer'
import { Experience } from '../../../components/Experience'
import { connect } from '../../../utils/dbConnect'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

/* interface Iprops {
    experiences: IFormExp[]
}
 */

const allExp = ({ experiences }: InferGetStaticPropsType<typeof getStaticProps>) => {



    const isLoggedIn = useAuth()
    const parsed = JSON.parse(experiences)



    let displayExperiences: IExperience[] = parsed.map((experience: IExperience, i: number) => {



        return (

            <Experience experience={experience} />


        )
    })


    return (


        <div className="flex justify-center " >
            <div className='w-4/5 flex max-w-md  flex-col align-center justify-center'>
            {isLoggedIn.isLoggedIn ? (
                <Link href="/admin/upload/experience">
                    <button className="text-2xl hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                        Ladda upp ny erfarenhet
                    </button>
                </Link>
            ) : (null)}
                {displayExperiences}
                    

                
            </div>
       


        </div>

    )



}

export async function getStaticProps() {


    const { Experience } = await connect();

    let temp = await Experience.find({});
    console.log(temp)
    let experiences = JSON.stringify(temp)

    return {
        props: {
            experiences
        }
    }

}


export default allExp