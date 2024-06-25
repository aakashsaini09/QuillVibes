// import axios from "axios";
// import { BACKEND_URL } from "./config";
import { useState } from "react";
import { Blog } from "./hooks";
const UserBlogs = () => {
    // console.log("token is:: ",localStorage.getItem("token"))
    const [allBlogs, setAllBlogs] = useState<Blog[]>([ 
        {
            title: "How a raper Helped Me Raise Two Million Dollars",
            content: "An unconventional decision led me to one of the happiest times of my life. — In 2019, my entrepreneurial venture in video",
            id: 2,
            publishDate: "aak",
            author: {
            name: "aakash"
         }
        },
        {
            title: "How a raper Helped Me Raise Two Million Dollars",
            content: "An unconventional decision led me to one of the happiest times of my life. — In 2019, my entrepreneurial venture in video",
            id: 12,
            publishDate: "aak",
            author: {
            name: "aakash"
         }
        },
        {
            title: "How a raper Helped Me Raise Two Million Dollars",
            content: "An unconventional decision led me to one of the happiest times of my life. — In 2019, my entrepreneurial venture in video",
            id: 1,
            publishDate: "aak",
            author: {
            name: "aakash"
         }
        },
        {
            title: "How a raper Helped Me Raise Two Million Dollars",
            content: "An unconventional decision led me to one of the happiest times of my life. — In 2019, my entrepreneurial venture in video",
            id: 4,
            publishDate: "aak",
            author: {
            name: "aakash"
         }
        },
        
    ])
      if(5>7){
        setAllBlogs([])
      }
    // useEffect(() => {
    //   reqFunction()
    // }, [])
    
    // const reqFunction = async () => {
    //     try {
    //         const response = await axios.post(
    //             `${BACKEND_URL}/api/v1/blog/myblogs`, 
    //             {}, // data payload (if any), empty object here
    //             { 
    //                 headers: {   
    //                     Authorization: localStorage.getItem("token")
    //                 }
    //             }
    //         );
    //         setAllBlogs(response.data.blogs);
    //         console.log(allBlogs)
    //     } catch (error) {
    //         console.error("Error fetching blogs:", error);
    //     }
    // }
   

  return (
    <div className="sm:flex sm:flex-col md:flex md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-5 justify-center">
        {allBlogs.map((e)=> {
            return <div key={e.id} className="my-3 min-w-64 m-auto">
                <a href="#" className="block max-w-sm p-6 pb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="pt-3 flex justify-around w-full pb-0">
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Edit Blog</button>
                    <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Delete Blog</button>
                </div>
                </a>
                </div>
        })}
        </div>
        <div className="w-full lg:w-[35vw] bg-purple-600 min-h-32"></div>
    </div>
  )
}

export default UserBlogs
