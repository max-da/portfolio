import axios from "axios"
import { Upload } from "../../../components/Upload"
import { uploadExperience, uploadProject } from "../../../utils/declaritveObjects"


const experience = () => {
  
    return (
        <>
            <Upload  files={false} items={uploadExperience} />
        </>
    )
}
export default experience
