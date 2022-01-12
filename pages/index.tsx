import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
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
  }

]
const Home = (props: IProjectsArr) => {

  const [navigation, setNavigation] = useState(navRoutes)
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const incrementIndex = () => {
    if (index + 1 === navigation.length) {
      setIndex(0)
    }
    else {
      setIndex(index + 1)
    }
  }
 
  return (
    <>
      <Navbar />
      <div className="bg-blue-300 flex justify-center items-center h-screen" >

        <div>
          <h1 className='text-8xl'>max</h1>
          <div className='flex'>

            <h1 onClick={incrementIndex} className='text-8xl' >{navigation[index].name}</h1>
            {navigation[index].path != "/" ? (
              <button onClick={()=>{
                router.push(navigation[index].path)
              }}>
                <h2 className='text-6xl'>Go</h2>
              </button>
            ):null}

          </div>
        </div>


      </div>

    </>
  )



}


export default Home
