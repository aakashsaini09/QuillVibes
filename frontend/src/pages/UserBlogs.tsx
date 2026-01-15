import { useState, useEffect } from "react";
import { Blog } from "../hooks";
import { useRecoilValue } from "recoil";
import { UserName } from "../store/user";
import { Avatar } from "../components/BlogCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

const UserBlogs: React.FC = () => {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
    const [loading, setloading] = useState(true);
    
    useEffect(() => {
        reqFunction();
    }, []);
    
    const reqFunction = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/myblogs`,
                {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setAllBlogs(response.data.blogs);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error("Error fetching blogs:", error);
        }
    };
    
    const name = useRecoilValue(UserName);

    const deleteBlog = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        
        setloading(true);
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`);
            reqFunction();
        } catch (error) {
            setloading(false);
            console.log(error);
        }
    };

    // Update blog state
    const [popUP, setpopUP] = useState(false);
    const [updatedTitle, setupdatedTitle] = useState('');
    const [updatedContent, setupdatedContent] = useState('');
    const [updatedId, setupdatedId] = useState(0);
    
    const canclePopUp = () => {
        setpopUP(e => !e);
    };
    
    const updateBlogFunction = async (blog: Blog) => {
        canclePopUp();
        setupdatedTitle(blog.title);
        setupdatedContent(blog.content);
        setupdatedId(blog.id);
    };
    
    const updateBlogConfirm = async () => {
        setloading(true);
        try {
            const res = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                id: updatedId,
                title: updatedTitle,
                content: updatedContent
            });
            if (res.status === 200) {
                setloading(false);
                reqFunction();
                setpopUP(false);
            }
        } catch (error) {
            alert("Error while updating blog");
            console.log(error);
            setloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                {/* Profile Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <Avatar size="big" name={name} />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>
                            <p className="text-gray-600">Your personal blog collection</p>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                                <div className="h-7 bg-gray-300 rounded-lg mb-3"></div>
                                <div className="space-y-2 mb-4">
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                    <div className="h-3 bg-gray-200 rounded"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                                    <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : allBlogs.length <= 0 ? (
                    /* Empty State */
                    <div className="flex justify-center items-center py-20">
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md">
                            <div className="text-6xl mb-6">✍️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No blogs yet</h3>
                            <p className="text-gray-600 mb-6">Start sharing your thoughts and experiences by creating your first blog.</p>
                            <Link to="/publish">
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                    Create Your First Blog
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Blog Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {allBlogs.map((blog) => (
                            <div key={blog.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                                {/* Card Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <Link to={`/blog/${blog.id}`}>
                                        <h2 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 flex-grow">
                                        {blog.content.slice(0, 200)}
                                        {blog.content.length > 200 && "..."}
                                    </p>
                                    
                                    {blog.content.length > 200 && (
                                        <Link to={`/blog/${blog.id}`} className="text-blue-600 text-sm font-medium hover:underline mb-4 inline-block">
                                            Read full article →
                                        </Link>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                                    <button
                                        onClick={() => updateBlogFunction(blog)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteBlog(blog.id)}
                                        disabled={loading}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {popUP && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
                                <button
                                    onClick={canclePopUp}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto flex-grow">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
                                    <input
                                        value={updatedTitle}
                                        onChange={(e) => setupdatedTitle(e.target.value)}
                                        type="text"
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Enter blog title..."
                                    />
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-semibold text-gray-700">Content</label>
                                    <textarea
                                        value={updatedContent}
                                        onChange={(e) => setupdatedContent(e.target.value)}
                                        rows={12}
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Write your article..."
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-200 flex gap-3">
                                <button
                                    onClick={updateBlogConfirm}
                                    disabled={loading || !updatedTitle.trim() || !updatedContent.trim()}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Updating..." : "Update Blog"}
                                </button>
                                <button
                                    onClick={canclePopUp}
                                    disabled={loading}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBlogs;