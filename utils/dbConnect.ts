import mongoose, { Collection, Model, mongo } from "mongoose";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => {
      console.log(err);
    });
  console.log("Connected");

  const projectSchema = new mongoose.Schema({
    name: {type:String, required:true},
    techStack: {type:String, required:true},
    description: {type:String, required:true},
    createdDate: Date,
    gitLink: String || null,
    liveLink: String,
    images: [
      {
        image: {
          path: { type: String, required: true },
        },
      },
    ],
  });
  const adminSchema = new mongoose.Schema({
    username:String,
    password: String,
   /*  token: String,
    tokenExpiration: Date, */
  
  });
 
 
  const Admins = mongoose.models.admins || mongoose.model("admins", adminSchema);
  const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

  return { connection, Project, Admins};
};
