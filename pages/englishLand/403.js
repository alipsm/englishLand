import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Index() {
    const navigate=useRouter()
    useEffect(() => {
        setTimeout(() => {
            navigate.push("/home")
        }, 10);
    }, [])
  return (
    <div className='flex justify-center items-center h-full flex-col'>
      {/* <p>Your page was not found</p> */}
      {/* <p>You will be directed to the home page</p> */}
    </div>
  )
}
