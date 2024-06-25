import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import Navbar from '../components/Navbar';
import SingleBlog from '../components/SingleBlog';

const Blog = () => {
  const {id}  = useParams();

  const {loading, blog} = useBlog({
    id: id || ""
  });
  
  if(loading || !blog){
    return<div>
      <Navbar/>
      <div className='h-screen flex flex-col '>
        <div className='flex flex-col items-center'>
<div role="status" className="max-w-5xl animate-pulse w-2/3">
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
    <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>

</div>
</div>

      </div>
    </div>
  }
  return (
    // <div>
      <SingleBlog blog={blog}/>
    // </div>
  )
}

export default Blog