import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useBlogs, useprofileBlog } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserName } from "../store/user";

const Blogs = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  
  const { loading, blogs } = useBlogs();
  const { user } = useprofileBlog();
  // @ts-ignore
  const [name, setName] = useRecoilState(UserName);
  setName(user?.name || "Aakash");
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          {/* Hero Section Skeleton */}
          <div className="mb-12 md:mb-16 text-center animate-pulse">
            <div className="h-10 md:h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 md:w-2/3 mx-auto mb-4"></div>
            <div className="h-5 md:h-6 bg-gray-200 rounded-lg w-2/3 md:w-1/2 mx-auto"></div>
          </div>

          {/* Blog Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-7 bg-gray-300 rounded-lg mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            Discover Stories
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Explore thought-provoking articles from our community of writers
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
            <p className="text-gray-500">Be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.slice().reverse().map((blog) => (
              <BlogCard 
                key={blog.id}
                autherName={blog.author.name || "Anonymous"}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                publishedDate={"22nd Jan 2024"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;