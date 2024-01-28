import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const Login = () => {


  return (
   <>
      <Link
     href="/login"
        className="relative flex  items-center justify-center    hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        Login
      </Link>

      <Link
     href="/register"
        className="relative flex  items-center justify-center    hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        Sing up
      </Link>
   
   </>

      
    
  )
}

export default Login
    