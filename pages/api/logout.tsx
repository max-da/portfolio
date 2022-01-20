import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/session";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<boolean>) {

  req.session.destroy();
  res.redirect("/")
}