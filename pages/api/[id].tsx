import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/dbConnect";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
    .get(async (req, res) => {
     const projectId = req.query.id
        console.log(projectId)
        console.log("HEJSAN")
        const { Project } = await connect();
        console.log(await Project.find({_id:projectId}));
        res.json(await Project.find({_id:projectId}));
   
    })
    export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
