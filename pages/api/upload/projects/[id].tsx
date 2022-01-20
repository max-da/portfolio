import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/dbConnect";
import nc from "next-connect";
import { IFormProject, Iprojects } from "../../../../utils/interfaces";
import project from "../../../admin/upload/project";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
   /*  .get(async (req, res) => {
        const projectId = req.query.id

        const { Project } = await connect();

        res.json(await Project.find({ _id: projectId }));

    }) */
    .put(async (req, res) => {
    

        try {
            const projectId = req.query.id
            console.log(projectId)
            console.log("AOSJLKDAS")
            const form: IFormProject = req.body
            const { Project } = await connect();
            await Project.findOneAndUpdate({ _id: projectId }, form, { runValidators: true, context: 'query' })

            res.status(200).json("nice")
        } catch (error) {
            console.log(error)
            res.status(400).json("HÖTRRU")
        }
    })
    .delete(async (req, res) => {

      try {
            const projectId = req.query.id
            const { Project } = await connect();
            await Project.deleteOne({ _id: projectId })
            
            res.status(200).json("nice")
        } catch (error) {
            console.log(error)
     
        } 
       /*  const {Project}  = await connect()
        await Project.deleteMany({})
        res.status(200) */

    })
export default handler;

export const config = {
    api: {
        bodyParser: true, // Disallow body parsing, consume as stream
    },
};