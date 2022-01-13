import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSpring, animated, easings, useTransition, config } from 'react-spring'
import SelectedPath from '../components/SelectedPath'
import { Iprojects } from '../utils/interfaces'


interface IProjectsArr {
  projects: Iprojects[]
}
interface INavRoutes {
  name: string;
  path: string;

}
const navRoutes: INavRoutes[] = [
  {
    name: "dahlbom",
    path: "/"
  },
  {
    name: "projects",
    path: "/projects/all"
  },
  {
    name: "experience",
    path: "/about/experience"
  },
  {
    name: "contact",
    path: "/about/contact"
  }

]
const Home = () => {
  const [show, setShow] = useState(false)
  const [navigation, setNavigation] = useState(navRoutes)
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const props = useSpring({
    from: {
      color: '#ee3a43',
      rotateX: 0,
      transformOrigin: "center",

    },
    to: {
      color: '#277ef4',
      rotateX: 720,

      transformOrigin: "center",
    },
    config: {
      duration: 3000,
      easing: easings.easeInOutQuart,
    },
    loop: { reverse: true },
  })
  const onClickArrow = () => {
    router.push(navigation[index].path)
    console.log("ASLDNASKDs")
  }
  const incrementIndex = () => {
    if (index + 1 === navigation.length) {
      setIndex(0)
    }
    else {
      setIndex(index + 1)
    }
  }
  const selection = navRoutes.map((route) => {
    return (
      <SelectedPath name={route.name} current={navigation[index].name} />
    )

  })


  useEffect(() => {
    setTimeout(() => { incrementIndex() }, 3000)
  }, [index])
  return (
    <>



      <div className='flex flex-col content-center h-screen w-screen relative items-center'>
        <div className='bg-blue-200 w-3/5 relative top-1/4 drop-shadow-lg'>


          <div className='w-3/5 h-21  relative bg-blue-800'>
            <div className='top-1/4 relative flex justify-between w-4/5 '>
              <h1 className='text-6xl font-roboto italic bg-blue-500 ' >max</h1>
              <div className=''>
                <animated.div style={props} className='  text-5xl flex justify-start hover:cursor-pointer select-none' onClick={onClickArrow}>
                  <span className='select-none' >


                  </span>
                </animated.div>
              </div>

            </div>
            <>

            </>
            <div className='top-1/4 relative flex  w-5/5 justify-between flex-col'>




              <h1 onClick={incrementIndex} className='text-6xl font-roboto italic hover:cursor-pointer select-none' >{navigation[index].name}</h1>




            </div>


          </div>
          <div className='flex justify-between w-5/5 h-2'>
            {selection}
          </div>
        </div>
      </div>



    </>
  )



}


export default Home
