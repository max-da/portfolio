import type { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Iprojects } from '../../utils/interfaces'
import { Project } from '../../components/Project'
import { connect } from '../../utils/dbConnect'


const FocusView = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const project: Iprojects = JSON.parse(projects)

    return (
        <>
          
            <div className='flex justify-center'>
            <Project project={project} focus={true}></Project> 
            </div>


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
                },
                revalidate:10
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
        fallback: "blocking"
    }
}


export default FocusView


