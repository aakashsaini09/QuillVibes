import { Link } from "react-router-dom";
interface BlogCardProps{
    autherName: string;
    title: string; 
    content: string;
    publishedDate: string;
    id: number
}
const BlogCard = ({autherName, title, content, publishedDate, id}: BlogCardProps) => {
  return ( <Link to={`/blog/${id}`}>
    <div className="sm:px-4 md:p-6 px-5 border shadow-lg rounded-lg my-4 border-slate-200 pb-4 sm:max-w-lg mx-4 md:min-w-[52vw] max-w-screen-md cursor-pointer relative sm:left-0 md:-left-8">
      <div className="flex items-center gap-3 my-3">
        <div className="flex justify-center flex-col "><Avatar name={autherName} size="small"/></div>
         <div className="font-bold text-xl text-slate-800">{autherName}</div> 
         <div className="font-extralight text-gray-600 text-sm flex justify-center">{publishedDate}</div>
      </div>

      <div className="font-bold text-3xl mb-2">{title}</div>
      <div className="text-slate-900 text-base"> {content.slice(0, 150)}<span className="px-1 text-blue-500 underline">Read more</span></div>
      <div className="text-gray text-base font-extralight text-slate-500 mt-4 pb-3 mb-1"> {`${Math.ceil(content.length / 100)} Minutes read`} </div>
    </div>
    </Link>
  )
}
export function Avatar({name,size}: {name: string, size?: "small" | "big"}){
  let tempNameValue : string = name.toUpperCase()
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small"? "w-7 h-7": "w-10 h-10"}`}>
  <span className= {`text-gray-200 font-semibold ${size ==="small" ? "text-sm" : "text-md"}`}>{tempNameValue[0]}</span>
</div>
}

export default BlogCard
