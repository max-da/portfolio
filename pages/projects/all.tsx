import { IExperience, Iprojects } from '../../utils/interfaces'
import { Project } from '../../components/Project'
import { useEffect, useState } from 'react'
import useAuth from '../../utils/useAuth'
import Link from 'next/link'
import { connect } from '../../utils/dbConnect'
import { InferGetServerSidePropsType, GetStaticProps } from 'next'
import { animated, useTrail } from 'react-spring'




const Projects = ({ projects }: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const isLoggedIn = useAuth()
    const parsed: Iprojects[] = JSON.parse(projects)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (parsed.length > 0) {
            setLoading(false)
        }
    }, [parsed])

    const Trail = () => {
        const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            setLoaded(true)
        }, [])
        const trail = useTrail(parsed.length, {
            opacity: !loaded ? 0 : 1,
            transform: !loaded ? 'scale(0.3)' : 'scale(1)',
            delay: 900,
            config: {
                duration: 400
            }

        });


        return (

            <div className=" flex  flex-col justify-center items-center w-full  " >
                {trail.map((animation, i) => <animated.div key={i} style={animation} >
                    <Project key={parsed[i]._id} focus={false} project={parsed[i]} />
                        
                </animated.div>)}

            </div>
        );
    };
    return (


        <div className=" flex  flex-col justify-center items-center w-full  " >




            {loading ? (<span>loading..</span>) :
                <Trail />}

            {isLoggedIn.isLoggedIn ? (
                <Link href="/admin/upload/project">
                    <button className="text-2xl hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                        Ladda upp nytt projekt
                    </button>
                </Link>
            ) : (null)}
        </div>

    )



}
export async function getServerSideProps() {


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

