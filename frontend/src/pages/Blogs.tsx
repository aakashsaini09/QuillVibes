import { useEffect } from "react";
import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import { useBlogs, useprofileBlog } from "../hooks"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserName } from "../store/user";
const Blogs = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }
    },[]);
  
  const { loading, blogs} = useBlogs()
  const { user} = useprofileBlog()
  // @ts-ignore
  const [name, setName] = useRecoilState(UserName)
  setName(user?.name|| "Aakash")
  if(loading){
    return <div>
      <Navbar/>
      <div className='h-screen flex flex-col justify-center'>
        <div className='flex flex-col items-center'>
      <div role="status" className="max-w-5xl animate-pulse w-3/4">
          <div className="h-2.5 bg-gray-200 rounded-full w-5/6 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-5/6 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-5/6 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      </div>
      </div>

      </div>
    </div>
  }
  return (
    <div>
      <Navbar/>
    <div className="flex justify-center">
      <div className="">
        {blogs.slice().reverse().map((blog) => <BlogCard 
          autherName={blog.author.name || "Anonymous"}
          id={blog.id}
          title={blog.title}
          key={blog.id}
          content={blog.content}
          publishedDate={"22nd Jan 2024"}/>
        )}
         </div>
    </div>
    </div>
  )
}
export default Blogs
