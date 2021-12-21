import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/dbConnect";
import multer from "multer";
import nc from "next-connect";
import { IImage } from "../../utils/interfaces";
type Data = {
  method: string;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

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
    const { Project } = await connect();
    console.log(await Project.find({}));
    res.json(await Project.find({}));
  })
  .post(upload.array("image"), async (req, res) => {
    const { name, techStack, description, createdDate, gitLink, liveLink } =
      req.body;
    try {
      let images: IImage[] = [];

      if (req.files) {
        for (const [key, value] of Object.entries(req.files)) {
          console.log(`${key}: ${value.filename}`);
          let image = {
            image: { path: value.filename },
          };
          images.push(image);
        }
      }
  
      const { Project } = await connect();
      await new Project({
        name: name,
        techStack: techStack,
        description: description,
        createdDate: createdDate,
        gitLink: gitLink,
        liveLink: liveLink,
        images: images,
      }).save();
    } catch (err) {
      console.log(err);
      res.status(400).json(err)
      
    }
  });
export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
