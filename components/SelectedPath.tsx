import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { animated, config, useTransition } from "react-spring"
import useAuth from "../utils/useAuth"
import { INavRoutes, navRoutes , adminRoute} from "./DynamicNav"

interface Iprops {
  name: string;
  current: string;
  routes:INavRoutes[]

}
const SelectedPath = (props: Iprops) => {

  const [selected, setSelected] = useState(false)
  const isLoggedIn = useAuth()
  const router = useRouter()
  const [navigation,setNavigation] = useState<INavRoutes[]>([])

  const transition = useTransition(selected, {
    from: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, },
    reverse: selected,
    config: config.stiff,
  })
  useEffect(()=>{
    setNavigation(props.routes)
  },[props.routes])
  useEffect(() => {
    if (props.name === props.current) {
      setSelected(true)
      console.log(props.name)
      console.log(props.current)
    } else {
      setSelected(false)
    }
  }, [props.current])

/*   useEffect(() => {

    if (isLoggedIn) {
      setNavigation(adminRoute)
    }
    else {
      setNavigation(navRoutes)
    }
  }, [isLoggedIn.isLoggedIn]) */
  const navigate = () => {

    for (let i = 0; i < navigation.length; i++) {
      const element = navigation[i];
      if (props.name === element.name) {
        router.push(element.path)
      }
    }


  }
  return (
    <>


      <div className="  h-full w-full mt-3 bg-purple" onClick={() => navigate()}>
        {transition((styleProps, item) =>
          item ?
            <animated.div style={styleProps} className="w-full h-full bg-red-500 " />
            :
            ""

        )}
      </div>
    </>

  )
}

export default SelectedPath