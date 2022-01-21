// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { useState } from "react";
import { connect } from "../../utils/dbConnect";
import { Ierror } from "../../utils/interfaces";
import { sessionOptions } from "../../utils/session";


/* Jämför input med krypterade lösen i databas */
export default withIronSessionApiRoute(
  
  async function loginRoute(req, res) {
    let errorMessage:Ierror = {
      statusCode:401,
      errorMessage:"Fel lösenord"
    };
    const { username, password } = req.body;

    const bcrypt = require("bcrypt");
    let isValid = false;

    const { Admins } = await connect();
    try {
      let admin = await Admins.findOne({ username: username });
      isValid = await bcrypt.compare(password, admin.password);
    } catch (err) {
      errorMessage = ({statusCode:403, errorMessage:"Denna sida är enbart för administratörer."})
    }

    if (isValid) {
      req.session.user = true;
      await req.session.save();
      res.send({ ok: true });
    } else {
      req.session.user = false;
      await req.session.save();
      res.status(errorMessage.statusCode).json(errorMessage.errorMessage)
  
    }
    
    res.end()
  
  },
  sessionOptions
);
