import { Upload } from "../../../components/Upload"
import { uploadProject } from "../../../utils/declaritveObjects"
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../utils/session"

const project = () => {
    return (
        <>
            <Upload   files={true} items={uploadProject} />
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user
        if(!user){
            return {
                notFound:true
              };
        }
        return {
            props: {

                user: req.session.user,

            },
        };
    },
    sessionOptions,
);
export default project

