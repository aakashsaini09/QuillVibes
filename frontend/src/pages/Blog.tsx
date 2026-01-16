import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import Navbar from '../components/Navbar';
import SingleBlog from '../components/SingleBlog';

const Blog = () => {
  const { id } = useParams();

  const { loading, blog } = useBlog({
    id: id || ""
  });
  
  if (loading || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <SingleBlog blog={blog} />;
}

export default Blog;