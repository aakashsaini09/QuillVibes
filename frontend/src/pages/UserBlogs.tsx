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
    const [allBlogs, setAllBlogs] = useState<Blog[]>([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        reqFunction()
    }, [])
    const reqFunction = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/myblogs`,
                {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
            );
            setAllBlogs(response.data.blogs);
            setloading(false)
        } catch (error) {
            setloading(false)
            console.error("Error fetching blogs:", error);
        }
    }
    const name = useRecoilValue(UserName)

    const deleteBlog = async (id: number) => {
        setloading(true)
        try {
            await axios.delete(
                `${BACKEND_URL}/api/v1/blog/${id}`);
            reqFunction()
        } catch (error) {
            setloading(false)
            console.log(error)
        }
    }
    // update blog code here
    const [popUP, setpopUP] = useState(false)
    const [updatedTitle, setupdatedTitle] = useState('')
    const [updatedContent, setupdatedContent] = useState('')
    const [updatedId, setupdatedId] = useState(0)
    const canclePopUp = () => {
        setpopUP(e => !e)
    }
    const updateBlogFunction =async (blog: Blog) => {
        canclePopUp()
        setupdatedTitle(blog.title)
        setupdatedContent(blog.content)
        setupdatedId(blog.id)
    }
    const updateBlogConfirm = async ()=>{
        setloading(true)
        try {
            const res = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                id: updatedId,
                title: updatedTitle,
                content: updatedContent
            });
                if(res.status === 200){
                    setloading(false)
                    reqFunction()
                    setpopUP(false)
                }
        } catch (error) {
            alert("Error while updating blog") 
            console.log(error)
        }
    }
    return (
        <>
            <div>
                <Navbar />
                <div className="text-xl font-bold m-5 px-2"><span className="px-2"><Avatar size="big" name={name} /></span>{name}</div>
                <div className="sm:flex sm:flex-col md:flex md:flex-row ">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-5 md:px-20 justify-center w-full">
                        {allBlogs.length <= 0 ? (
                            <div className="w-[100vw] h-[30vh] flex justify-center items-center mx-auto">
                                <div className="block h-full text-center p-6 bg-white rounded-lg shadow-2xl">
                                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">You don't have any blogs yet</h5>
                                    <p className="font-normal text-gray-700">Start sharing your thoughts and experiences by creating your first blog.</p>
                                    <Link to={`/publish`} className="mt-5"><button type="button" className="mr-8 mt-12 min-w-32 outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600"><i className="fa-solid fa-feather pr-2"></i> Create</button></Link>
                                </div>
                            </div>

                        ) : (allBlogs.map((e) => {
                            return <div key={e.id}>
                                <div className="my-3 m-auto ">
                                    <div className="block relative p-6 pb-3 min-h-96 border border-gray-200 rounded-lg hover:bg-gray-100 shadow-md">
                                        <Link to={`/blog/${e.id}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{e.title.slice(0, 55) + "..."}</Link>
                                        <p className="font-normal text-gray-700 pt-2">{e.content.slice(0, 350)}{e.content.length > 250 ? (<Link to={`/blog/${e.id}`} className="mx-1 text-blue-600 underline">Read More</Link>) : ("")}</p>
                                        <div className="pt-3 flex justify-around w-full absolute bottom-0 mr-3 -right-2 pb-3">
                                            <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => updateBlogFunction(e)}>Edit Blog</button>
                                            <button disabled={loading ? true : false} onClick={() => deleteBlog(e.id)} className={`text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${loading ? 'cursor-not-allowed' : ''}`}>Delete Blog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }))}
                        {popUP && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                <div className="bg-slate-100 w-3/4 h-5/6 p-8 rounded shadow-lg overflow-auto">
                                <span className="relative flex justify-end font-bold text-xl cursor-pointer" onClick={canclePopUp}><i className="fa-solid fa-xmark"></i></span>

                                    <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title here</label>
                                    <input value={updatedTitle} onChange={(e)=>setupdatedTitle(e.target.value)} type="text" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"/>
                                    </div>
                                    
                                    <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                                    <textarea value={updatedContent} onChange={(e)=>setupdatedContent(e.target.value)} rows={10} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base" placeholder="Write an article..."></textarea>
                                    </div>
                                    <button disabled={loading ? true : false} type="button" className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${loading ? 'cursor-not-allowed' : ''}`} onClick={updateBlogConfirm}>Update Blog</button>
                                    <button disabled={loading ? true : false} type="button" className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${loading ? 'cursor-not-allowed' : ''}`} onClick={canclePopUp}>Cancle</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
export default UserBlogs
