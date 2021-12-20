import type { NextPage } from 'next'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'


const upload: NextPage = () => {
    const [files, setFiles] = useState<FileList| null>()
    return (
        <div className="bg-blue-300 flex justify-center items-center h-screen" >
            <div className='flex-col flex justify-center items-center h-96 '>
                <input multiple className='text-3xl' type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => { setFiles(e.currentTarget.files) }} />
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => { console.log(files) }}>
                  asds
                </button>
               
            </div>




        </div>

    )
}

export default upload
