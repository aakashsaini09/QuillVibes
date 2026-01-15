import { Link } from "react-router-dom";

interface BlogCardProps {
  autherName: string;
  title: string; 
  content: string;
  publishedDate: string;
  id: number;
}

const BlogCard = ({ autherName, title, content, publishedDate, id }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 h-full flex flex-col hover:-translate-y-1">
        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={autherName} size="small" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{autherName}</div>
              <div className="text-xs text-gray-500">{publishedDate}</div>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-bold text-2xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {content.slice(0, 150)}...
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">
              {`${Math.ceil(content.length / 100)} min read`}
            </span>
            <span className="text-blue-600 text-sm font-medium group-hover:gap-2 flex items-center transition-all">
              Read more 
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Avatar({ name, size }: { name: string, size?: "small" | "big" }) {
  const tempNameValue: string = name.toUpperCase();
  const colors = [
    'bg-gradient-to-br from-blue-500 to-indigo-600',
    'bg-gradient-to-br from-purple-500 to-pink-600',
    'bg-gradient-to-br from-green-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-red-600',
    'bg-gradient-to-br from-cyan-500 to-blue-600',
  ];
  
  // Generate consistent color based on first letter
  const colorIndex = tempNameValue.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${bgColor} ${size === "small" ? "w-10 h-10" : "w-12 h-12"} shadow-md`}>
      <span className={`text-white font-bold ${size === "small" ? "text-base" : "text-lg"}`}>
        {tempNameValue[0]}
      </span>
    </div>
  );
}

export default BlogCard;