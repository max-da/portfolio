import { useEffect, useState } from "react"
import { animated, config, useTransition } from "react-spring"

interface Iprops {
  name: string;
  current: string;

}
const SelectedPath = (props: Iprops) => {
  const [selected, setSelected] = useState(false)

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

      <div className="  w-full mt-2">
        {selected ? (
          <div className="w-full h-1 bg-white " >
          </div>
        ) : (
          <div className="w-full h-1 bg-blue-200 " ></div>
        )}
      </div>

    </>

  )
}

export default SelectedPath