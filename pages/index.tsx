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

  const transition = useTransition(navigation[index], {
    from: { opacity: 0, position:"absolute", y: -100 },
    enter: { opacity: 1, y: 0},
    leave: { opacity: 0, y: 100 },

    config: config.stiff,
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


  /*   useEffect(() => {
      setTimeout(() => { incrementIndex() }, 3000)
    }, [index]) */
  return (
    <>



      {/* <div className='flex flex-col h-screen w-screen  items-center'>
        <div className='h-1/6 w-3/5 relative top-1/4 drop-shadow-lg  flex flex-col justify-between max-w-lg'>


          <div className='w-3/5 h-21  relative bg-blue-800 drop-shadow-xl'>
            <div className='top-1/4 relative flex justify-between w-4/5 b flex-col'>
              <h1 className='text-5xl font-roboto italic bg-blue-500 ' >max</h1>


    

       
              <div className='h-5'>
                {transition((styleProps, item) =>
                  item ? <animated.h1 style={styleProps}>
                    <h1 className='text-5xl font-roboto italic hover:cursor-pointer select-none drop-shadow-xl' onClick={incrementIndex} >
                    {item.name}
                    </h1>
                  </animated.h1>:""
                )}

              </div>



        

              </div>


            </div>


      
          <div className='flex justify-between w-5/5 h-2'>
            {selection}
          </div>
        </div>
      </div> */}



    </>
  )



}


export default Home
