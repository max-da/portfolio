import Router, { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import { IRoute } from "../utils/interfaces";
import useAuth from "../utils/useAuth"

import { DynamicNav } from "./DynamicNav";



interface Iprops {
    children: ReactNode
}
/* Layout, skickar vidare route names */
const Layout = (props: Iprops) => {

    const router = useRouter()
    const [route, setRoute] = useState<IRoute>({ path: router.pathname })
    useEffect(() => {
      
        setRoute({ path: router.pathname })
    }, [router.pathname])
    return (
        <>

            <div className="flex min-h-screen justify-center relative ">

                <div className="md:max-w-screen-lg min-h-screen w-full  rounded  bg-shade drop-shadow-xl ">
                    <DynamicNav  route={route.path} />
                    {props.children}
                </div>

            </div>
        </>
    )
}
export default Layout