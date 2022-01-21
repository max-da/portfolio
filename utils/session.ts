
import type { IronSessionOptions } from 'iron-session'


export const sessionOptions: IronSessionOptions = {
  password: process.env.IRON_SESSION as string,
  cookieName: "acack",
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}


declare module 'iron-session' {
  interface IronSessionData {
    user?: boolean
  }
}