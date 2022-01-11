import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/dbConnect";
import nc from "next-connect";
import { Iform, Iprojects } from "../../utils/interfaces";
import jwt from "jsonwebtoken";
const key = "12345"
const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Not allowed");
    },
})
    .post(async (req, res) => {
        console.log("TRIGG")
        const { username, password } = req.body

        const bcrypt = require("bcrypt");


        const { Admins } = await connect()
        try {
            let admin = await Admins.findOne({ username: username })
            const validAdmin = await bcrypt.compare(password, admin.password)
            if (validAdmin) {

                const token = jwt.sign({ username: username }, key, { expiresIn: "1d" })
                console.log(token)
                res.json(token)
               
            }
        }


        catch (err) {
            res.status(400).json("Denna sida är enbart för admins")


        }



    })
export default handler;
