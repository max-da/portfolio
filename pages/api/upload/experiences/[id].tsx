import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/dbConnect";
import nc from "next-connect";
import { IFormExp, IFormProject, Iprojects } from "../../../../utils/interfaces";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
    .put(async (req, res) => {
        const experienceId = req.query.id

        try {
            console.log("AOSJLKDAS")
            const form: IFormExp = req.body
            const { Experience } = await connect();
            await Experience.findOneAndUpdate({ _id: experienceId },  form,{ runValidators: true, context: 'query' })

            res.status(200).json("nice")
        } catch (error) {
            res.status(500).json("as")
            console.log(error)
        }
    })
    .delete(async (req, res) => {
        console.log("KLASDNSAKLJNDAJK")
        try {
            const experienceId = req.query.id
            const { Experience } = await connect();
            await Experience.deleteOne({ _id: experienceId })
            
            res.status(200).json("nice")
        } catch (error) {
            console.log(error)
            res.status(400)
        }


    })
export default handler;

export const config = {
    api: {
        bodyParser: true, // Disallow body parsing, consume as stream
    },
};