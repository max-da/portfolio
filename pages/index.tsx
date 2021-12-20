import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'


const Home: NextPage = (props:any) => {
const {todos} = props
 console.log(props)

  return (
    <>
      <div className="bg-blue-300 flex justify-center items-center h-screen" >
        <Link href="/admin/upload">
          <a className='text-8xl'>hej</a>
        </Link>
        <button onClick={()=>getServerSideProps()}>sd</button>
      </div>
    </>
  )



}

export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch("http://localhost:3000/api/main")
  const todos = await res.json()

  // return props
  return {
    props: { todos},
  }
}
export default Home
