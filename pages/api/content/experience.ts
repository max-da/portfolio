import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/dbConnect";
import nc from "next-connect";
import { IImage } from "../../../utils/interfaces";

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

    const { Experience } = await connect();

    res.json(await Experience.find({}));
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { name, description, startDate, endDate, current } = req.body;
    console.log(name);

    try {
      const { Experience } = await connect();
      await new Experience({
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        current: current,
      }).save();
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
export default handler;
