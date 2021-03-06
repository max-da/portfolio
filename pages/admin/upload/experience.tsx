import { Upload } from "../../../components/Upload"
import { uploadExperience, uploadProject } from "../../../utils/declaritveObjects"
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../utils/session"
/* Kollar att användare är inloggad, ger annars 404 */
const experience = () => {
   
    return (
        <>
            <Upload files={false} items={uploadExperience} />
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
export default experience
