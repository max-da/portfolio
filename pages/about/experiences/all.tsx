


import { IExperience, IFormExp, Iprojects } from '../../../utils/interfaces'

import { Project } from '../../../components/Project'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../../utils/useAuth'
import { useInView } from 'react-intersection-observer'
import { Experience } from '../../../components/Experience'
import { connect } from '../../../utils/dbConnect'
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { animated, useTrail } from 'react-spring'

/* interface Iprops {
    experiences: IFormExp[]
}
 */

const AllExp = ({ experiences }: InferGetServerSidePropsType<typeof getServerSideProps>) => {



    const isLoggedIn = useAuth()
    const parsed: IExperience[] = JSON.parse(experiences)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(parsed)
        if (parsed.length > 0) {

            parsed.sort((a: IExperience, b: IExperience) => (a.startDate! < b.startDate!) ? 1 : -1)

        }
        setLoading(false)
    }, [parsed])

    const Trail = () => {
        const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            setLoaded(true)
        }, [])
        const trail = useTrail(parsed.length, {
            opacity: !loaded ? 0 : 1,
            transform: !loaded ? 'scale(0.3)' : 'scale(1)',
            delay: 250,
            config: {
                duration: 300
            }

        });


        return (

            <div className=" " >
                {trail.map((animation, i) => <animated.div key={i} style={animation} >
                    <Experience key={parsed[i]._id} experience={parsed[i]} />

                </animated.div>)}

            </div>
        );
    };


    return (


        <div className="flex justify-center " >
            <div className='w-4/5 flex max-w-md  flex-col align-center justify-center'>


    
                {loading ? (
                    <span>loading</span>
                ) : (
                    <Trail />
                )}
                {isLoggedIn.isLoggedIn ? (
                    <div className="flex justify-center">
                        <Link href="/admin/upload/experience">
                            <button className="text-2xl hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                                Ladda upp ny erfarenhet
                            </button>
                        </Link>
                    </div>
                ) : (null)}

            </div>



        </div>

    )



}

export async function getServerSideProps() {


    const { Experience } = await connect();

    let temp = await Experience.find({});
    console.log(temp)
    let experiences = JSON.stringify(temp)

    return {
        props: {
            experiences
        },
    }

}


export default AllExp