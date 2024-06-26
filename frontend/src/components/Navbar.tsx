import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { UserName } from "../store/user"
const Navbar = () => {
const [popManager, setpopManager] = useState(false)
function changePopup (){
  setpopManager(pre => !pre)
}
function logOutFunction (){
  localStorage.removeItem("token")
}

const name = useRecoilValue(UserName)
  return (
    <div className="border-b flex justify-between px-10 py-4" >
        <Link to={`/blogs`} className="flex flex-col justify-center font-bold text-2xl">Medium</Link>
        <div className="flex justify-between">
          <Link to={`/publish`}><button type="button" className="mr-8 focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 dark:focus:ring-green-800">New</button></Link>
        <div onClick={changePopup} className="cursor-pointer">
          <Avatar size={"big"} name={name}/>
        </div>
{popManager &&
        <div className="absolute h-auto px-3 py-2 w-24 bg-gray-100 right-2 top-12 flex flex-col">
          <div className="my-1 border-b w-full"><Link to={`/userBlogs`}>Profile</Link></div>
          <div className="my-1 border-b w-full" onClick={logOutFunction}><Link to={`/`}>LogOut</Link></div>
        </div>
}
        </div>
    </div>
  )
}
export default Navbar
