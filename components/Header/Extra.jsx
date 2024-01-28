import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const Extra = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)

  const trigger = useRef(null)
  const dropdown = useRef(null)

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  return (
   <>
      <Link
     href="/home"
        className="relative flex  items-center justify-center    hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        Home
      </Link>
   
   </>

      
    
  )
}

export default Extra
    