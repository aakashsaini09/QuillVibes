import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import { useBlogs } from "../hooks"

const Blogs = () => {
  const { loading, blogs} = useBlogs()
  if(loading){
    return <div className="h-full w-full flex justify-center items-center">
      loading....
    </div>
  }
  return (
    <div>
      <Navbar/>
    <div className="flex justify-center">
      <div className="max-w-xl">
        <BlogCard 
          autherName={"Aakash Saini"}
          title={"Smoking Too Much Weed Almost Ruined My Life"}
          content={"One of the squarest, most socially alienating things you can say in SF is this: “I was addicted to pot.” “Bullshit,” people will respond, rolling their eyes. “You can’t get addicted to pot. Cannabinoids, dude. Look it"}
          publishedDate={"22nd Jan 2024"}/>
         </div>
    </div>
    </div>
  )
}

export default Blogs
