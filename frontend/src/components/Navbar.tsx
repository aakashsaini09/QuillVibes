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
        <Link to={`/blogs`} className="flex flex-col justify-center font-extrabold text-2xl">QuillVibes</Link>
        <div className="flex justify-between">
          <Link to={`/publish`}><button type="button" className="mr-8 outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600"><i className="fa-solid fa-feather pr-2"></i> Write</button></Link>
        <div onClick={changePopup} className="cursor-pointer">
          <Avatar size={"big"} name={name}/>
        </div>
{popManager &&
        <div className="absolute rounded-md h-auto px-3 py-2 w-24 bg-gray-900 text-white right-2 top-14 flex flex-col">
          <div className="my-1 w-full"><Link to={`/userBlogs`}>Profile</Link></div>
          <div className="my-1 w-full" onClick={logOutFunction}><Link to={`/`}>LogOut</Link></div>
        </div>
}
        </div>
    </div>
  )
}
export default Navbar
