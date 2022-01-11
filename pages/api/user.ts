// pages/api/user.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    let user = false;
    if(req.session.user === true){
      user = true
    }
    res.send({ user: user });
  },
  sessionOptions
);
