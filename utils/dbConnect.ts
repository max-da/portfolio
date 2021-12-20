import mongoose, {Model} from "mongoose";

const {DATABASE_URL} = process.env;

export const connect = async ()=> {
    const connection = await mongoose.connect(DATABASE_URL as string)
    .catch((err)=> {console.log(err)})
    console.log("Connected")

    const projectSchema = new mongoose.Schema({
        name: String,
        
    })
    
    const Project = mongoose.model("Project", projectSchema)
    return {connection, Project}


}