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
    <div className="border-b flex justify-between mx-4 md:px-10 py-4 items-center" >
        <Link to={`/blogs`} className="flex flex-col justify-center font-extrabold text-2xl">QuillVibes</Link>
        <div className="flex justify-between">
          <Link to={`/publish`}><button type="button" className="mr-1 md:mr-8 outline-none text-black font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-white hover:bg-slate-100"><i className="fa-solid fa-feather pr-2 text-black text-xl"></i> Write</button></Link>

        <Link to={`/ai`} type="button" className="mr-3 md:mr-8 outline-none text-white font-medium rounded-lg text-sm px-2 md:px-5 py-1.5 md:py-2.5 mb-3 bg-blue-600 text-center">Generate with AI</Link>

        <div onClick={changePopup} className="cursor-pointer">
          <Avatar size={"big"} name={name}/>
        </div>
{popManager &&
        <div className="absolute rounded-md h-auto z-10 px-3 py-2 w-24 bg-gray-900 text-white right-2 top-14 flex flex-col">
          <div className="my-1 w-full"><Link to={`/userBlogs`}>Profile</Link></div>
          <div className="my-1 w-full" onClick={logOutFunction}><Link to={`/`}>LogOut</Link></div>
        </div>
}
        </div>
    </div>
  )
}
export default Navbar
