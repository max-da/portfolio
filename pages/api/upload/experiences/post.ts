// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { connect } from "../../../../utils/dbConnect";
import { sessionOptions } from "../../../../utils/session";

export default withIronSessionApiRoute(async function post(req, res) {

  /* Kollar att request skickas med giltig inloggnings cookie, laddar sedan upp / kastar error */

  if (!req.session.user) {
    res.status(403).json("Denna funktionalitet är endast för administratörer.");
  } else {
    const { name, description, startDate, endDate, current } = req.body;

    try {
      const { Experience } = await connect();
      await new Experience({
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        current: current,
      }).save();
      res.status(200).json("Success");
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}, sessionOptions);


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
