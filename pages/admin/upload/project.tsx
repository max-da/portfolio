import { Upload } from "../../../components/Upload"
import { uploadProject } from "../../../utils/declaritveObjects"


const project = () => {
    return (
        <>
            <Upload   files={true} items={uploadProject} />
        </>
    )
}
export default project