import { Avatar } from "./BlogCard";
import Navbar from "./Navbar";
import { Blog } from "../hooks";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  // Calculate reading time
  const readingTime = Math.ceil(blog.content.length / 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <article className="container mx-auto px-4 py-14 md:py-24 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author Info & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Avatar size="big" name={blog?.author?.name || "Anonymous"} />
              <div>
                <div className="font-semibold text-gray-900">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <div className="text-sm text-gray-500">Author</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>2nd Dec 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 md:p-10">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <Avatar size="big" name={blog?.author?.name || "Anonymous"} />
              <div className="flex-1">
                <div className="text-xl font-bold text-gray-900 mb-2">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A passionate writer sharing insights and stories with the community. 
                  Thank you for reading!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blogs Button */}
        <div className="mt-8 text-center">
          <a
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all blogs
          </a>
        </div>
      </article>
    </div>
  );
}

export default SingleBlog;