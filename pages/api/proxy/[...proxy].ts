/* import httpProxy from "http-proxy";
import Cookies from "cookies";
import url from "url";
import { IncomingMessage } from "http";

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: any, res: any) => {
  return new Promise<void>((resolve, reject) => {
    console.log("EJNBDLNADLSNL");
    const pathname = ():string=> {
        if(req.url){
            return url.parse(req.url).pathname
        }else{
            return ""
        }
    };
    const isLogin = pathname === "/api/proxy/login";
    console.log(isLogin);
    const cookies = new Cookies(req, res);
    const authToken = cookies.get("auth-token");

    // Rewrite URL, strip out leading '/api'
    // '/api/proxy/*' becomes '${API_URL}/*'
    req.url = req.url.replace(/^\/api\/proxy/, "");

    // Don't forward cookies to API
    req.headers.cookie = "";
    proxy.web(req, res, {
      target: "http://localhost:3000/api/login",
      // Don't autoRewrite because we manually rewrite
      // the URL in the route handler.
      autoRewrite: false,
      // In case we're dealing with a login request,
      // we need to tell http-proxy that we'll handle
      // the client-response ourselves (since we don't
      // want to pass along the auth token).
      selfHandleResponse: isLogin,
    });
    // Set auth-token header from cookie
    if (authToken) {
      req.headers["auth-token"] = authToken;
    }
 
     if (isLogin) {
        proxy.once("proxyRes", intercept);
      } 
   

    function intercept(proxyRes: any, request: any, response: any) {
      let apiResponseBody = "";
      proxyRes.on("data", (chunk: any) => {
            console.log(JSON.parse(chunk))
        apiResponseBody += chunk;
      });
      // Once we've read the entire API
      // response body, we're ready to
      // handle it:
      proxyRes.on("end", () => {
        try {
          const { authToken } = JSON.parse(apiResponseBody);
          const cookies = new Cookies(req, res);
          cookies.set("auth-token", authToken, {
            httpOnly: true,
            sameSite: "lax", // CSRF protection
          });
          res.status(200).json({ loggedIn: true });
          resolve();
        } catch (error) {
          console.log(error);
        }
      });
    }
    proxy.on("proxyRes", (e: IncomingMessage) => {
      // console.log(e)
    });
    proxy.on("proxyReq", (e) => {
        console.log(e)
      console.log("SNADLK");
    });
    proxy.on("start", () => {
      console.log("aasd");
    });
    proxy.on("proxyReqWs", () => {
      console.log("!asd");
    });
  });
};
 */

//Sparar jwt i cookies tillsvidare
export const x = ()=> {

}