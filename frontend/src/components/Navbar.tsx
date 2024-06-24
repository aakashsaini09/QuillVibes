import { Avatar } from "./BlogCard"

const Navbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4" >
        <div className="flex flex-col justify-center font-bold text-2xl">Medium</div>
        <div><Avatar size={"big"} name="Aakash"/></div>
    </div>
  )
}

export default Navbar
