import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Iprojects } from '../utils/interfaces'

interface IProjectsArr {
  projects: Iprojects[]
}
const Home = (props: IProjectsArr) => {
  

  return (
    <>
     <div className="bg-blue-300 flex justify-center items-center h-screen" >
               
                <Link href="/projects">
                    <a className='text-8xl'>Projects</a>
                </Link>
               
            </div>
 
    </>
  )



}


export default Home
