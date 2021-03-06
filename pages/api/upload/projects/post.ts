import { withIronSessionApiRoute } from "iron-session/next";
import multer from "multer";
import nc from "next-connect";
import { connect } from "../../../../utils/dbConnect";
import { IImage } from "../../../../utils/interfaces";
import { sessionOptions } from "../../../../utils/session";

const path = require("path")
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      let fn = file.originalname.split(path.extname(file.originalname))[0] + '-' + Date.now() + path.extname(file.originalname);
      cb(null,  fn);
    },
  }),
});

/* Validerar request på samma sätt som i exp, dock med nc som handler då det gjorde det */
/* mycket mer läsbart när man använder multer  */
export default withIronSessionApiRoute(
  nc().post(upload.array("image"),async (req,res)=> {
    if (!req.session.user) {
      res.status(403).json("Denna funktionalitet är endast för administratörer.");
    } else {
      const { name, techStack, description, createdDate, gitLink, liveLink } =
      req.body;
    try {
      
  
      let images: IImage[] = [];
  
      if (req.files) {
      
        for (const [key, value] of Object.entries(req.files)) {
          let image = {
            image: { path: value.filename },
          };
          images.push(image);
        }
      }
      if(images.length === 0){
        throw new Error
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
      res.status(200).json("BRA")
    } catch (err) {
   
      res.status(500).json("fail:P")
    }
  }}),
sessionOptions);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};


