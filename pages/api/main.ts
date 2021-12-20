import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/dbConnect";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 
  switch (req.method) {
    case "POST":
      console.log("post");
      res.json({max:"max"})
      break;
      
    case "GET":
      async (req: NextApiRequest, res: NextApiResponse) => {
        console.log("Get")
        const { Project } = await connect();
     
        res.json(await Project.find())
        
      };
      break;
    default:
      res.json({max:"max"})
  }
}

const handleRequest = (method:string):any => {
  switch (method) {
    case "POST":
      console.log("post");
      return 
      
    case "GET":
      async (req: NextApiRequest, res: NextApiResponse) => {
        console.log("Get")
        const { Project } = await connect();
        let x = await Project.find()
      
        return x
      };
      break;
    default:
      console.log("peepee");
  }
};