import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Navbar = () => {

  return (
    <Link to={`/blogs`} className="border-b flex justify-between px-10 py-4" >
        <div className="flex flex-col justify-center font-bold text-2xl">Medium</div>
        <div className="flex justify-between">
          <Link to={`/publish`}><button type="button" className="mr-8 focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 hover:bg-green-700 dark:focus:ring-green-800">New</button></Link>
        <div><Avatar size={"big"} name={"Aakash"}/></div>
        </div>
    </Link>
  )
}
export default Navbar
