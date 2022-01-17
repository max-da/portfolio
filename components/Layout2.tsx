import Router, { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import { IRoute } from "../utils/interfaces";
import useAuth from "../utils/useAuth"
import { AdminNav } from "./AdminNav";
import { DynamicNav } from "./DynamicNav";
import { Navbar } from "./Navbar";

interface Iprops {
    children: ReactNode
}

const Layout2 = (props: Iprops) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter()
    const [onHome, setOnHome] = useState(false)
    const [route, setRoute] = useState<IRoute>({ path: router.pathname })
    const [minimize, setMinimize] = useState(false)

    useEffect(() => {
        console.log("JNASKDN")
        if (router.pathname === "/") {
            setOnHome(true)
        } else {
            setOnHome(false)
        }
        console.log(router.pathname)
        if(router.pathname === "/projects/[id]"){
  
             console.log("TRUUUUUUUUUUUUUUUU")
         }
         else{
             setMinimize(false)
         } 
        setRoute({ path: router.pathname })
    }, [router.pathname])
    return (
        <div className="flex min-h-screen justify-center ">
       
            <div className="md:max-w-screen-lg min-h-screen w-full  rounded border border-purple bg-bgWhite drop-shadow-xl ">
                <DynamicNav minimize={minimize} route={route.path} />
                {isLoggedIn ? (
                    <div >

                    </div>
                ) : (
                    <div >

                    </div>
                )}
                {props.children}
            </div>
        </div>
    )
}
export default Layout2