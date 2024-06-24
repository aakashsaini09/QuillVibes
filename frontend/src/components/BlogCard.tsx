interface BlogCardProps{
    autherName: string;
    title: string; 
    content: string;
    publishedDate: string
}
const BlogCard = ({autherName, title, content, publishedDate}: BlogCardProps) => {
  return (
    <div>
      <div>
        <div className="flex justify-center flex-col">
        <Avatar name={autherName} />
        </div>
         <div className="font-extralight">{autherName} .</div> 
         {publishedDate}
      </div>
      <div>
        {title}
      </div>
      <div>
        {content.slice(0, 100) + "..."}
      </div>
      <div>
        {`${Math.ceil(content.length / 100)} Minutes`}
      </div>
      <div className="bg-slate-200 h-1 w-full">

      </div>
    </div>
  )
}
function Avatar({name}: {name: string}){
  let tempNameValue : string = name.toUpperCase()
  return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
  <span className="font-medium text-gray-300">{tempNameValue[0]}</span>
</div>
}

export default BlogCard
