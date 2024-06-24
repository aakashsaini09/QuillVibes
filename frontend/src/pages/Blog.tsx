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
      <div className='h-screen flex flex-col justify-center'>
        <div className='flex justify-center'>
          loading....
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