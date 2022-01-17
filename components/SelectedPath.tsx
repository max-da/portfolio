import { route } from "next/dist/server/router"
import { useEffect, useState } from "react"
import { animated, config, useTransition } from "react-spring"

interface Iprops {
  name: string;
  current: string;

}
const SelectedPath = (props: Iprops) => {
  const [selected, setSelected] = useState(false)
  const transition = useTransition(selected, {
    from:{opacity:0,x:-100},
    enter:{opacity:1, x:0},
    leave:{opacity:0,},
    reverse:selected,
    config: config.stiff,
  })
  useEffect(() => {
    if (props.name === props.current) {
      setSelected(true)
      console.log(props.name)
      console.log(props.current)
    } else {
      setSelected(false)
    }
  }, [props.current])


  return (
    <>

  
      <div className="  h-full w-full mt-3 bg-purple">
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