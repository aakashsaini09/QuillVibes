// import axios from "axios";
// import { BACKEND_URL } from "./config";
import { useState, useEffect } from "react";
import { Blog } from "../hooks";
import { useRecoilValue } from "recoil";
import { UserName } from "../store/user";
import { Avatar } from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/Navbar";
const UserBlogs : React.FC = () => {
// console.log("token is:: ",localStorage.getItem("token"))
const [allBlogs, setAllBlogs] = useState<Blog[]>([])
// const [loading, setloading] = useState(true)
useEffect(() => {
reqFunction()
}, [])
const reqFunction = async () => {
try {
    const response = await axios.post(
    `${BACKEND_URL}/api/v1/blog/myblogs`, 
    {},{ 
        headers: {   
            Authorization: localStorage.getItem("token")
        }
        }
    );
    setAllBlogs(response.data.blogs);
    // setloading(false)
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}
const name = useRecoilValue(UserName)

    const deleteBlog = async(id:number) => {
        // setloading(true)
        try {
            await axios.delete(
                `${BACKEND_URL}/api/v1/blog/${id}`);
                reqFunction()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        {/* <div className={`absolute h-full w-full z-10 flex justify-center items-center top-0 bottom-0 right-0 left-0 bg-slate-200 bg-opacity-60 overscroll-none`}>Loading</div> */}
    <div>
    <Navbar/>
    <div className="text-xl font-bold m-5 px-2"><span className="px-2"><Avatar size="big" name={name}/></span>{name}</div>
<div className="sm:flex sm:flex-col md:flex md:flex-row ">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5 justify-center w-full">
    {allBlogs.length <= 0 ?(
        <div>Add blogs</div>
    ): (allBlogs.map((e)=> {
        return <div key={e.id} className="my-3 m-auto">
            <div className="block max-w-sm p-6 pb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{e.content}</p>
            <div className="pt-3 flex justify-around w-full pb-0">
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Edit Blog</button>
                <button onClick={()=>  deleteBlog(e.id)} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Delete Blog</button>
            </div>
            </div>
            </div>
    }))}
    </div>
   </div>
</div>
    
    </>
  )
}

export default UserBlogs
